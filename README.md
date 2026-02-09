# NotebookLM to Anki 转换工具

通过 Chrome 扩展一键提取 NotebookLM 测验题目，生成带交互功能的 Anki 卡片包。

## 功能特点

- Chrome 扩展一键提取 NotebookLM 测验数据（推荐）
- 支持从已保存的 HTML 文件离线提取
- 支持手动输入测验题目
- 交互式 Anki 卡片模板（选项随机排序、倒计时、答题统计、正误动画）
- 自动识别单选/多选题型
- 自动提取解题思路和排除分析
- 自动检测卡组名称（笔记本名 + 制品标题）
- 中英文双语界面

## 安装

### 1. 安装 Python 依赖

```bash
pip install -r requirements.txt
```

依赖包：Flask、Flask-CORS、genanki、BeautifulSoup4。

### 2. 加载 Chrome 扩展

1. 打开 Chrome，进入 `chrome://extensions/`
2. 开启右上角「开发者模式」
3. 点击「加载已解压的扩展程序」
4. 选择项目中的 `chrome-extension/` 目录

## 使用方法

### 方式一：Chrome 扩展提取（推荐）

这是最便捷的使用方式，直接在浏览器中操作。

**1. 启动本地服务器**

```bash
python server.py
```

或通过主程序菜单：

```bash
python main.py
# 选择 1 → 启动服务器
```

服务器默认运行在 `http://127.0.0.1:5000`。

**2. 打开 NotebookLM 测验页面**

在 Chrome 中打开 NotebookLM，生成或打开一个测验。

**3. 点击扩展图标**

- 扩展会自动检测服务器连接状态
- 自动填充卡组名称（格式：`NotebookLM 测验::笔记本名::制品标题`）
- 点击「提取并生成」按钮
- 自动下载 `.apkg` 文件

**4. 导入到 Anki**

打开 Anki → 文件 → 导入 → 选择下载的 `.apkg` 文件。

### 方式二：从 HTML 文件提取

适用于已保存的网页或无法使用扩展的情况。

1. 在浏览器中打开 NotebookLM 测验页面
2. `Ctrl+S` 保存网页（选择「网页，全部」）
3. 运行主程序：

```bash
python main.py
# 选择 2 → 从 HTML 文件提取
```

4. 输入保存的 HTML 文件路径（程序会自动查找同目录下 `_files/shim.html`）

### 方式三：手动输入

适用于题目较少或其他提取方式失败的情况。

```bash
python main.py
# 选择 3 → 手动输入
```

按提示逐题输入问题、选项（A-H）、正确答案、解题思路和点拨内容。支持多选题（答案直接连写，如 `AC`）。

## 卡片模板功能

生成的 Anki 卡片使用自定义交互式模板，包含以下功能：

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
- 计时器开关
- 选项随机排序开关
- 答题统计开关
- 题目定位开关
- 答案数量提示开关
- 设置面板

## 配置

编辑 `config.py` 调整以下设置：

```python
# Anki 卡片模板
ANKI_MODEL_ID = 1607392319
ANKI_DECK_NAME = "NotebookLM 测验"
ANKI_MODEL_NAME = "NotebookLM 选择题"

# 本地服务器
SERVER_HOST = "127.0.0.1"
SERVER_PORT = 5000

# 输出
OUTPUT_DIR = "output"
DEFAULT_OUTPUT_FILENAME = "notebooklm_quiz.apkg"
```

## 自定义卡片样式

卡片模板文件位于 `Anki卡片模板/` 目录：

- `正面内容模板.html` — 正面 HTML + 交互脚本
- `背面内容模板.html` — 背面 HTML + 评判/统计脚本
- `样式.css` — 卡片样式表

修改这些文件后重新生成 `.apkg` 即可应用新样式。

## 项目结构

```
notebooklm-to-anki/
├── chrome-extension/        # Chrome 扩展
│   ├── manifest.json        #   扩展配置（Manifest V3）
│   ├── popup.html           #   弹出窗口界面
│   ├── popup.js             #   提取逻辑 + 服务器通信
│   └── content.js           #   内容脚本（预留）
├── Anki卡片模板/            # Anki 交互式卡片模板
│   ├── 正面内容模板.html    #   正面模板
│   ├── 背面内容模板.html    #   背面模板
│   └── 样式.css             #   卡片样式
├── server.py                # Flask 本地转换服务器
├── main.py                  # CLI 主程序入口
├── scraper.py               # 数据提取模块（HTML 解析 + 手动输入）
├── anki_generator.py        # Anki 卡片生成模块
├── config.py                # 配置文件
├── requirements.txt         # Python 依赖
├── example_quiz_data.json   # 示例数据
└── output/                  # 输出目录（自动创建）
    └── *.apkg               #   生成的 Anki 卡片包
```

## 技术栈

- **Flask** + **Flask-CORS**：本地转换服务器
- **genanki**：Anki 卡片包生成
- **BeautifulSoup4**：HTML 文件解析
- **Chrome Extension (Manifest V3)**：浏览器端测验数据提取

## 故障排除

### 扩展显示「服务器未运行」

确保已启动本地服务器：

```bash
python server.py
```

服务器启动后终端会显示 `http://127.0.0.1:5000`。

### 扩展提取失败

1. 确保当前页面是 NotebookLM 测验页面
2. 确保测验已完全加载（所有题目可见）
3. 尝试刷新页面后重试
4. 如仍失败，改用「HTML 文件提取」方式：`Ctrl+S` 保存网页后用 `python main.py` 模式 2 处理

### 生成的卡片格式不正确

1. 使用 `python main.py` 的「验证和编辑」功能逐题检查
2. 确认 `Anki卡片模板/` 目录下的三个模板文件完整
3. 确保答案标签（A/B/C/D）与选项对应

### 安装依赖时出错

```bash
# 升级 pip
python -m pip install --upgrade pip

# 使用国内镜像
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

## 数据格式

Chrome 扩展从 NotebookLM 页面提取的原始 JSON 包含：

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

程序自动将其转换为 Anki 字段格式。参见 `example_quiz_data.json` 了解转换后的格式。

## 常见问题

### Q: 支持哪些题型？

A: 支持单选题和多选题（最多 A-H 共 8 个选项）。

### Q: 可以批量处理多个测验吗？

A: 使用 Chrome 扩展时，每个测验页面单独提取并下载。生成的 `.apkg` 文件可分别导入 Anki。

### Q: 如何备份已生成的卡片？

A: `.apkg` 文件保存在 `output/` 目录。导入 Anki 后，也可通过 Anki 自带的导出功能备份。

### Q: 卡组名称可以自定义吗？

A: 可以。Chrome 扩展会自动检测并填充名称，也可以在输入框中手动修改。使用 `::` 分隔符可创建子卡组层级。

## 许可证

MIT License
