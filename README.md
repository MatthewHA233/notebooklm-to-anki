# NotebookLM to Anki 转换工具

纯 Chrome 扩展，一键提取 NotebookLM 测验题目，在浏览器端生成带交互功能的 Anki 卡片包（无需服务器）。

## 功能特点

- 纯浏览器端生成 `.apkg`，无需安装 Python 或启动服务器
- 一键提取 NotebookLM 测验数据
- 交互式 Anki 卡片模板（选项随机排序、倒计时、答题统计、正误动画）
- 自动识别单选/多选题型（最多 A-H 共 8 个选项）
- 自动提取解题思路和排除分析
- 自动检测卡组名称（笔记本名 + 制品标题）
- 中英文双语界面

## 安装

1. 打开 Chrome，进入 `chrome://extensions/`
2. 开启右上角「开发者模式」
3. 点击「加载已解压的扩展程序」
4. 选择项目中的 `chrome-extension/` 目录

## 使用方法

1. 在 Chrome 中打开 NotebookLM，生成或打开一个测验
2. 点击扩展图标
3. 卡组名称会自动填充（格式：`NotebookLM 测验::笔记本名::制品标题`），也可手动修改
4. 点击「提取并生成」按钮
5. 自动下载 `.apkg` 文件
6. 打开 Anki → 文件 → 导入 → 选择下载的 `.apkg` 文件

## 卡片模板功能

**正面（答题）**：
- 题目和选项展示
- 点击选项进行作答（支持单选/多选）
- 可开启选项随机排序
- 可开启倒计时计时器
- 题目定位信息（所在组 - 序号）

**背面（结果）**：
- 正确答案高亮对比
- 你的选择 vs 正确选项
- 答对/答错动画反馈（答对有彩纸动画）
- 累计答题统计（正确率百分比）
- 解题思路展示
- 点拨/排除分析展示
- 个人笔记区域

**工具栏**：
- 计时器、选项随机排序、答题统计、题目定位、答案数量提示开关

## 项目结构

```
chrome-extension/
├── manifest.json              # 扩展配置（Manifest V3）
├── popup.html                 # 弹出窗口界面
├── popup.js                   # 提取逻辑 + 流程控制
├── lib/
│   ├── anki-config.js         # Anki 常量配置（模型 ID、字段定义等）
│   ├── anki-card-templates.js # 内嵌 HTML/CSS 卡片模板
│   ├── quiz-transformer.js    # 数据转换（NotebookLM JSON → Anki 格式）
│   └── anki-generator.js      # .apkg 生成（sql.js + JSZip）
├── vendor/
│   ├── sql-wasm.js            # sql.js 库（WebAssembly SQLite）
│   ├── sql-wasm.wasm          # sql.js WASM 二进制
│   └── jszip.min.js           # JSZip 库
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 技术栈

- **sql.js**（WebAssembly SQLite）：浏览器端创建 Anki SQLite 数据库
- **JSZip**：打包 `.apkg`（ZIP 格式）
- **Chrome Extension Manifest V3**：页面数据提取 + 文件下载
- **Web Crypto API**：字段校验和计算（SHA-1）

## 数据格式

Chrome 扩展从 NotebookLM 页面提取的原始 JSON：

```json
{
  "quiz": [
    {
      "question": "问题文本",
      "answerOptions": [
        { "text": "选项文本", "isCorrect": false, "rationale": "分析" }
      ],
      "hint": "提示信息"
    }
  ],
  "topics": {
    "covered": ["知识点1", "知识点2"]
  }
}
```

## 故障排除

### 提取失败

1. 确保当前页面是 NotebookLM 测验页面
2. 确保测验已完全加载（所有题目可见）
3. 尝试刷新页面后重试

### 下载的文件扩展名不对

如果浏览器将 `.apkg` 保存为其他扩展名，手动将文件后缀改为 `.apkg` 即可正常导入 Anki。

## 许可证

MIT License
