"""
NotebookLM 测验数据提取模块

支持两种提取方式：
1. Chrome 插件在线提取（推荐）— 通过本地服务器接收数据，见 server.py
2. 从下载的 HTML 文件提取 — 解析 shim.html 中 data-app-data 属性的 JSON
3. 手动输入
"""
import json
import html
import re
from pathlib import Path
from bs4 import BeautifulSoup
from typing import List, Dict, Optional

import config


OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']


# ──────────────────────────────────────────────
# 从本地 HTML 文件提取
# ──────────────────────────────────────────────

def extract_from_html(html_path: str) -> List[Dict]:
    """
    从下载的 NotebookLM HTML 文件中提取测验数据

    支持传入主 HTML 文件路径或 shim.html 路径

    Args:
        html_path: HTML 文件路径

    Returns:
        题目列表
    """
    shim_path = _find_shim_html(html_path)
    if not shim_path:
        print("错误：找不到包含测验数据的 shim.html")
        print("请确保下载时保存了完整网页（包含 _files 文件夹）")
        return []

    print(f"找到数据文件: {shim_path}")

    with open(shim_path, 'r', encoding='utf-8') as f:
        content = f.read()

    raw_json = _parse_data_app_data(content)
    if not raw_json:
        print("错误：无法从文件中提取测验 JSON 数据")
        return []

    quiz_data = json.loads(raw_json)
    return _process_quiz_data(quiz_data)


def _find_shim_html(html_path: str) -> Optional[str]:
    """根据输入路径查找 shim.html"""
    path = Path(html_path)

    # 直接就是 shim.html
    if path.name == 'shim.html' and path.exists():
        return str(path)

    # 传入主 HTML 文件，查找同级 _files/shim.html
    if path.exists() and path.suffix == '.html':
        stem = path.stem
        files_dir = path.parent / f"{stem}_files"
        shim = files_dir / "shim.html"
        if shim.exists():
            return str(shim)

        # 遍历同目录所有 _files 文件夹
        for d in path.parent.iterdir():
            if d.is_dir() and d.name.endswith('_files'):
                shim = d / "shim.html"
                if shim.exists():
                    return str(shim)

    # 传入的是 _files 目录
    if path.is_dir():
        shim = path / "shim.html"
        if shim.exists():
            return str(shim)

    return None


def _parse_data_app_data(page_source: str) -> Optional[str]:
    """从 HTML 源代码中提取 data-app-data 的 JSON"""
    soup = BeautifulSoup(page_source, 'html.parser')
    app_root = soup.find('app-root', attrs={'data-app-data': True})
    if app_root:
        raw = app_root['data-app-data']
        decoded = html.unescape(raw)
        if '"quiz"' in decoded:
            return decoded.strip()

    # 正则备用
    match = re.search(r'data-app-data="(.*?)"', page_source, re.DOTALL)
    if match:
        decoded = html.unescape(match.group(1))
        if '"quiz"' in decoded:
            return decoded.strip()

    return None


# ──────────────────────────────────────────────
# 共用：数据转换
# ──────────────────────────────────────────────

def _process_quiz_data(quiz_data: Dict) -> List[Dict]:
    """处理原始 quiz JSON 数据"""
    quiz_list = quiz_data.get('quiz', [])
    topics = quiz_data.get('topics', {})

    # 用 covered topics 作为分组名
    covered = topics.get('covered', [])
    group_name = ', '.join(covered[:3])
    if len(covered) > 3:
        group_name += ' ...'

    quizzes = _convert_to_anki_format(quiz_list, group_name)

    print(f"成功提取 {len(quizzes)} 道题目")
    if covered:
        print(f"涵盖知识点: {', '.join(covered)}")

    return quizzes


def _convert_to_anki_format(quiz_list: List[Dict], group_name: str) -> List[Dict]:
    """
    将 NotebookLM 的 quiz JSON 转换为 Anki 生成器所需的格式

    字段映射：
    - question → 正面
    - answerOptions[].text → A/B/C/D
    - answerOptions[].isCorrect → 答案
    - answerOptions[].rationale → 解题思路 / 点拨
    - hint → 点拨内容
    """
    quizzes = []

    for idx, item in enumerate(quiz_list, 1):
        question = item.get('question', '')
        answer_options = item.get('answerOptions', [])
        hint_text = item.get('hint', '')

        options = []
        correct_labels = []
        rationales_correct = []
        rationales_wrong = []

        for i, opt in enumerate(answer_options):
            if i >= len(OPTION_LABELS):
                break

            label = OPTION_LABELS[i]
            text = opt.get('text', '')
            is_correct = opt.get('isCorrect', False)
            rationale = opt.get('rationale', '')

            options.append({'label': label, 'text': text})

            if is_correct:
                correct_labels.append(label)
                rationales_correct.append(f"<b>{label}. {text}</b>：{rationale}")
            else:
                rationales_wrong.append(f"{label}. {text}：{rationale}")

        answer = ''.join(correct_labels)

        # 解题思路：正确选项的 rationale
        explanation = '<br>'.join(rationales_correct)

        # 点拨内容：hint + 错误选项排除分析
        tips_parts = []
        if hint_text:
            tips_parts.append(f"<b>提示：</b>{hint_text}")
        if rationales_wrong:
            tips_parts.append("<b>排除分析：</b>")
            tips_parts.extend(rationales_wrong)
        tips = '<br>'.join(tips_parts)

        quizzes.append({
            'id': idx,
            'question': question,
            'options': options,
            'answer': answer,
            'group': group_name,
            'explanation': explanation,
            'tips': tips,
            'title1': '解题思路',
            'title2': '点拨',
        })

    return quizzes


# ──────────────────────────────────────────────
# 手动输入
# ──────────────────────────────────────────────

def manual_input_quiz() -> List[Dict]:
    """手动输入测验数据（备用方案）"""
    quizzes = []
    print("\n手动输入模式")
    print("提示：输入 'q' 退出输入\n")

    idx = 1
    while True:
        print(f"\n第 {idx} 题:")
        question = input("问题: ").strip()

        if question.lower() == 'q':
            break

        options = []
        print("选项（输入空行结束选项输入）:")
        for label in OPTION_LABELS:
            option_text = input(f"  {label}. ").strip()
            if not option_text:
                break
            options.append({'label': label, 'text': option_text})

        answer = input("正确答案 (A/B/C/D...，多选直接连写如 AB): ").strip().upper()
        explanation = input("解题思路（可选，按 Enter 跳过）: ").strip()
        tips = input("点拨内容（可选，按 Enter 跳过）: ").strip()
        group = input("所在组（可选，按 Enter 跳过）: ").strip()

        quizzes.append({
            'id': idx,
            'question': question,
            'options': options,
            'answer': answer,
            'explanation': explanation,
            'tips': tips,
            'group': group,
        })

        idx += 1

        if input("\n继续添加题目？(y/n): ").strip().lower() != 'y':
            break

    return quizzes
