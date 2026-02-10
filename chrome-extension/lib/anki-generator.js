/**
 * Anki .apkg 生成模块
 * 使用 sql.js (WebAssembly SQLite) + JSZip 生成 .apkg 文件
 *
 * .apkg = ZIP 包含:
 *   - collection.anki21 (SQLite 数据库)
 *   - media (JSON 文件, 内容为 "{}")
 */

// ── 工具函数 ──

const BASE91_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" +
  "!#$%&()*+,-./:;<=>?@[]^_`{|}~";

/**
 * 生成随机 base91 GUID (10 字符)
 */
function generateGuid() {
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += BASE91_CHARS[Math.floor(Math.random() * BASE91_CHARS.length)];
  }
  return result;
}

/**
 * 生成基于时间戳的唯一 ID
 */
let _idCounter = 0;
function generateId() {
  const now = Date.now();
  _idCounter++;
  return now + _idCounter;
}

/**
 * 去除 HTML 标签（Anki 在计算 csum 前会先 strip HTML）
 */
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "");
}

/**
 * 计算字段校验和 (csum): 先 strip HTML，再 SHA-1 哈希前 8 位十六进制转整数
 * 使用 Web Crypto API
 */
async function computeChecksum(firstField) {
  const stripped = stripHtml(firstField);
  const encoder = new TextEncoder();
  const data = encoder.encode(stripped);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = new Uint8Array(hashBuffer);
  const hex = Array.from(hashArray.slice(0, 4))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return parseInt(hex, 16);
}

/**
 * 生成 .apkg 文件
 * @param {Array} quizzes - processQuizData() 返回的题目数组
 * @param {string} deckName - 卡组名称
 * @returns {Promise<Blob>} .apkg 文件的 Blob
 */
async function generateApkg(quizzes, deckName) {
  // 初始化 sql.js — 预取 WASM 二进制后通过 wasmBinary 传入，
  // 比 locateFile 更可靠，避免 streaming compilation 的 MIME type 问题
  const wasmUrl = chrome.runtime.getURL("vendor/sql-wasm.wasm");
  const wasmBinary = await fetch(wasmUrl).then((r) => r.arrayBuffer());
  const SQL = await initSqlJs({ wasmBinary });
  const db = new SQL.Database();

  // 创建表结构
  createTables(db);

  // 生成 IDs
  const deckId = Date.now();
  const modelId = ANKI_MODEL_ID;
  const now = Math.floor(Date.now() / 1000);

  // 插入 col 记录
  insertCol(db, deckId, modelId, deckName, now, quizzes.length);

  // 插入 notes 和 cards
  let cardPosition = 1;
  for (const quiz of quizzes) {
    await insertNoteAndCard(db, quiz, modelId, deckId, now, cardPosition);
    cardPosition++;
  }

  // 导出数据库为二进制
  const dbData = db.export();
  db.close();

  // 用 JSZip 打包为 .apkg
  const zip = new JSZip();
  zip.file("collection.anki21", dbData);
  zip.file("media", "{}");

  return await zip.generateAsync({ type: "blob", mimeType: "application/octet-stream" });
}

// ── SQLite 表结构 ──

function createTables(db) {
  db.run(`
    CREATE TABLE col (
      id integer PRIMARY KEY,
      crt integer NOT NULL,
      mod integer NOT NULL,
      scm integer NOT NULL,
      ver integer NOT NULL,
      dty integer NOT NULL,
      usn integer NOT NULL,
      ls integer NOT NULL,
      conf text NOT NULL,
      models text NOT NULL,
      decks text NOT NULL,
      dconf text NOT NULL,
      tags text NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE notes (
      id integer PRIMARY KEY,
      guid text NOT NULL,
      mid integer NOT NULL,
      mod integer NOT NULL,
      usn integer NOT NULL,
      tags text NOT NULL,
      flds text NOT NULL,
      sfld text NOT NULL,
      csum integer NOT NULL,
      flags integer NOT NULL,
      data text NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE cards (
      id integer PRIMARY KEY,
      nid integer NOT NULL,
      did integer NOT NULL,
      ord integer NOT NULL,
      mod integer NOT NULL,
      usn integer NOT NULL,
      type integer NOT NULL,
      queue integer NOT NULL,
      due integer NOT NULL,
      ivl integer NOT NULL,
      factor integer NOT NULL,
      reps integer NOT NULL,
      lapses integer NOT NULL,
      left integer NOT NULL,
      odue integer NOT NULL,
      odid integer NOT NULL,
      flags integer NOT NULL,
      data text NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE revlog (
      id integer PRIMARY KEY,
      cid integer NOT NULL,
      usn integer NOT NULL,
      ease integer NOT NULL,
      ivl integer NOT NULL,
      lastIvl integer NOT NULL,
      factor integer NOT NULL,
      time integer NOT NULL,
      type integer NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE graves (
      usn integer NOT NULL,
      oid integer NOT NULL,
      type integer NOT NULL
    )
  `);
}

// ── col 表数据 ──

function insertCol(db, deckId, modelId, deckName, now, cardCount) {
  const fields = ANKI_FIELDS.map((f, i) => ({
    name: f.name,
    ord: i,
    sticky: false,
    rtl: false,
    font: "Arial",
    size: 20,
    media: [],
  }));

  const model = {
    [modelId]: {
      id: modelId,
      name: ANKI_MODEL_NAME,
      type: 0,
      mod: now,
      usn: -1,
      sortf: 0,
      did: deckId,
      tmpls: [
        {
          name: ANKI_TEMPLATE_NAME,
          ord: 0,
          qfmt: FRONT_TEMPLATE,
          afmt: BACK_TEMPLATE,
          bqfmt: "",
          bafmt: "",
          did: null,
          bfont: "",
          bsize: 0,
        },
      ],
      flds: fields,
      css: CARD_CSS,
      latexPre:
        "\\documentclass[12pt]{article}\n\\special{papersize=3in,5in}\n\\usepackage{amssymb,amsmath}\n\\pagestyle{empty}\n\\setlength{\\parindent}{0in}\n\\begin{document}\n",
      latexPost: "\\end{document}",
      latexsvg: false,
      req: [[0, "any", [0]]],
      vers: [],
      tags: [],
    },
  };

  const deck = {
    1: {
      id: 1,
      name: "Default",
      mod: 0,
      usn: 0,
      lrnToday: [0, 0],
      revToday: [0, 0],
      newToday: [0, 0],
      timeToday: [0, 0],
      collapsed: false,
      browserCollapsed: false,
      desc: "",
      dyn: 0,
      conf: 1,
      extendNew: 0,
      extendRev: 0,
    },
    [deckId]: {
      id: deckId,
      name: deckName,
      mod: now,
      usn: -1,
      lrnToday: [0, 0],
      revToday: [0, 0],
      newToday: [0, 0],
      timeToday: [0, 0],
      collapsed: false,
      browserCollapsed: false,
      desc: "",
      dyn: 0,
      conf: 1,
      extendNew: 0,
      extendRev: 0,
    },
  };

  const conf = {
    activeDecks: [1],
    curDeck: 1,
    newSpread: 0,
    collapseTime: 1200,
    timeLim: 0,
    estTimes: true,
    dueCounts: true,
    curModel: modelId,
    nextPos: cardCount + 1,
    sortType: "noteFld",
    sortBackwards: false,
    addToCur: true,
  };

  const dconf = {
    1: {
      id: 1,
      name: "Default",
      mod: 0,
      usn: 0,
      maxTaken: 60,
      autoplay: true,
      timer: 0,
      replayq: true,
      new: {
        bury: true,
        delays: [1, 10],
        initialFactor: 2500,
        ints: [1, 4, 7],
        order: 1,
        perDay: 20,
      },
      rev: {
        bury: true,
        ease4: 1.3,
        fuzz: 0.05,
        ivlFct: 1,
        maxIvl: 36500,
        perDay: 200,
        hardFactor: 1.2,
      },
      lapse: {
        delays: [10],
        leechAction: 0,
        leechFails: 8,
        minInt: 1,
        mult: 0,
      },
    },
  };

  db.run(
    `INSERT INTO col VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      1,           // id
      now,         // crt
      now,         // mod
      now * 1000,  // scm
      11,          // ver
      0,           // dty
      -1,          // usn
      0,           // ls
      JSON.stringify(conf),
      JSON.stringify(model),
      JSON.stringify(deck),
      JSON.stringify(dconf),
      JSON.stringify({}),
    ]
  );
}

// ── notes + cards 插入 ──

async function insertNoteAndCard(db, quiz, modelId, deckId, now, cardPosition) {
  const noteId = generateId();
  const guid = generateGuid();

  // 构建各选项文本
  const optionMap = {};
  for (const opt of quiz.options) {
    optionMap[opt.label] = opt.text;
  }

  // 13 个字段，用 \x1f 分隔
  const fieldValues = [
    quiz.question,                                    // 正面
    optionMap.A || "",                                 // A
    optionMap.B || "",                                 // B
    optionMap.C || "",                                 // C
    optionMap.D || "",                                 // D
    quiz.answer,                                      // 答案
    quiz.group || "",                                  // 所在组
    String(quiz.id || ""),                             // 序号
    quiz.explanation || "",                            // 解题思路
    quiz.tips || "",                                   // 点拨内容
    "",                                                // 我的笔记
    quiz.title1 || "解题思路",                         // 标题1
    quiz.title2 || "点拨内容",                         // 标题2
  ];

  const flds = fieldValues.join("\x1f");
  const sfld = fieldValues[0]; // sortField = 第一个字段
  const csum = await computeChecksum(sfld);

  db.run(
    `INSERT INTO notes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [noteId, guid, modelId, now, -1, "", flds, sfld, csum, 0, ""]
  );

  // 对应 card
  const cardId = generateId();
  db.run(
    `INSERT INTO cards VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      cardId,   // id
      noteId,   // nid
      deckId,   // did
      0,        // ord
      now,      // mod
      -1,       // usn
      0,            // type (new)
      0,            // queue (new)
      cardPosition, // due (sequential position for new cards)
      0,        // ivl
      0,        // factor
      0,        // reps
      0,        // lapses
      0,        // left
      0,        // odue
      0,        // odid
      0,        // flags
      "",       // data
    ]
  );
}
