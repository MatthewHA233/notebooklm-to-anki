const SERVER_URL = "http://localhost:5000";

// ── i18n ──
const I18N = {
  zh: {
    title: "NotebookLM 转 Anki",
    checking: "正在检查服务器...",
    serverOk: "服务器已连接",
    serverFail: "服务器未运行，请先执行: python server.py",
    deckLabel: "卡组名称",
    deckPlaceholder: "自动检测中...",
    extractBtn: "提取并生成",
    notOnPage: "请先打开 NotebookLM 测验页面",
    extracting: "正在从页面提取数据...",
    checkingServer: "正在检查服务器...",
    found: (n) => `找到 ${n} 道题，正在生成 .apkg...`,
    done: (n) => `完成！已生成 ${n} 张卡片。`,
    extractFail: "提取失败，请确保测验已打开并完全加载。",
  },
  en: {
    title: "NotebookLM to Anki",
    checking: "Checking server...",
    serverOk: "Server connected",
    serverFail: "Server not running. Start it with: python server.py",
    deckLabel: "Deck name",
    deckPlaceholder: "Auto-detecting...",
    extractBtn: "Extract & Generate",
    notOnPage: "Please open a NotebookLM quiz page first",
    extracting: "Extracting quiz data from page...",
    checkingServer: "Checking server...",
    found: (n) => `Found ${n} questions. Generating .apkg...`,
    done: (n) => `Done! ${n} cards generated.`,
    extractFail: "Failed to extract quiz data. Make sure the quiz is open and fully loaded.",
  },
};

const lang = navigator.language.startsWith("zh") ? "zh" : "en";
const t = I18N[lang];

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key]) el.placeholder = t[key];
  });
}

// ── DOM refs ──
const $ = (sel) => document.querySelector(sel);
const statusEl = $("#serverStatus");
const extractBtn = $("#extractBtn");
const progressEl = $("#progress");
const progressText = $("#progressText");
const deckNameInput = $("#deckName");

let detectedArtifactTitle = "";

function setStatus(text, type) {
  statusEl.textContent = text;
  statusEl.className = "status " + type;
}

function showProgress(text) {
  progressEl.style.display = "block";
  progressText.textContent = text;
}

function hideProgress() {
  progressEl.style.display = "none";
}

// ── Server check ──
async function checkServer() {
  try {
    const res = await fetch(SERVER_URL + "/health", { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      setStatus(t.serverOk, "success");
      extractBtn.disabled = false;
      return true;
    }
  } catch (_) {
    // ignore
  }
  setStatus(t.serverFail, "error");
  extractBtn.disabled = true;
  return false;
}

// ── Functions injected into the page ──

function extractFromCurrentFrame() {
  const appRoot = document.querySelector("app-root[data-app-data]");
  if (!appRoot) return null;

  const raw = appRoot.getAttribute("data-app-data");
  if (!raw || !raw.includes('"quiz"')) return null;

  try {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = raw;
    const decoded = textarea.value;
    return JSON.parse(decoded.trim());
  } catch (_) {
    return null;
  }
}

function extractPageMetadata() {
  const result = { notebookName: "", artifactTitle: "" };

  const notebookInput = document.querySelector("input.title-input");
  if (notebookInput) result.notebookName = notebookInput.value || "";

  const artifactInput = document.querySelector("input.artifact-title");
  if (artifactInput) result.artifactTitle = artifactInput.value || "";

  if (!result.artifactTitle) {
    const altInput = document.querySelector('input[aria-label="制品标题"]');
    if (altInput) result.artifactTitle = altInput.value || "";
  }

  return result;
}

// ── Auto-detect deck name on popup open ──
async function autoDetectDeckName() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.url?.includes("notebooklm.google.com")) return;

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractPageMetadata,
    });

    const meta = results?.[0]?.result;
    if (!meta) return;

    detectedArtifactTitle = meta.artifactTitle || "";

    const parts = ["NotebookLM 测验"];
    if (meta.notebookName) parts.push(meta.notebookName);
    if (meta.artifactTitle) parts.push(meta.artifactTitle);

    if (parts.length > 1) {
      deckNameInput.value = parts.join("::");
      deckNameInput.placeholder = "";
    }
  } catch (_) {
    // Not critical
  }
}

function sanitizeFilename(name) {
  return name.replace(/[<>:"/\\|?*]/g, "_").replace(/\s+/g, " ").trim();
}

// ── Extract quiz data ──
async function extractQuizData() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab || !tab.url || !tab.url.includes("notebooklm.google.com")) {
    throw new Error(t.notOnPage);
  }

  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      func: extractFromCurrentFrame,
    });

    for (const result of results) {
      if (result?.result) return result.result;
    }
  } catch (_) {
    // fall through to next strategy
  }

  try {
    const srcResults = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        return Array.from(document.querySelectorAll("iframe"))
          .map((f) => f.src)
          .filter((s) => s && !s.includes("accounts.google") && !s.includes("consent"));
      },
    });

    for (const src of srcResults?.[0]?.result || []) {
      try {
        const res = await fetch(src, { credentials: "include" });
        const html = await res.text();
        const match = html.match(/data-app-data="([\s\S]*?)"/);
        if (!match) continue;
        const textarea = document.createElement("textarea");
        textarea.innerHTML = match[1];
        const decoded = textarea.value;
        if (!decoded.includes('"quiz"')) continue;
        return JSON.parse(decoded.trim());
      } catch (_) {
        continue;
      }
    }
  } catch (_) {
    // exhausted
  }

  throw new Error(t.extractFail);
}

// ── Convert and download ──
async function convertAndDownload(quizData, deckName) {
  const body = { quiz_data: quizData };
  if (deckName) body.deck_name = deckName;

  const res = await fetch(SERVER_URL + "/convert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => null);
    throw new Error(errData?.error || `Server error: ${res.status}`);
  }

  const blob = await res.blob();
  const baseName = sanitizeFilename(detectedArtifactTitle || deckName || "notebooklm_quiz");
  const filename = baseName + ".apkg";

  const url = URL.createObjectURL(blob);
  await chrome.downloads.download({ url, filename, saveAs: true });
  URL.revokeObjectURL(url);
}

// ── Main flow ──
extractBtn.addEventListener("click", async () => {
  extractBtn.disabled = true;

  try {
    showProgress(t.checkingServer);
    const serverOk = await checkServer();
    if (!serverOk) return;

    showProgress(t.extracting);
    const quizData = await extractQuizData();

    const quizCount = quizData?.quiz?.length ?? 0;
    showProgress(t.found(quizCount));

    const deckName = deckNameInput.value.trim();
    await convertAndDownload(quizData, deckName);

    hideProgress();
    setStatus(t.done(quizCount), "success");
  } catch (err) {
    hideProgress();
    setStatus(err.message, "error");
  } finally {
    extractBtn.disabled = false;
  }
});

// On popup open
applyI18n();
checkServer();
autoDetectDeckName();
