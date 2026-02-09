"""
Anki 卡片生成模块
使用自定义交互式选择题模板
"""
import genanki
import random
from typing import List, Dict
import os
import config


# 模板文件目录
TEMPLATE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Anki卡片模板")


def _load_template_file(filename: str) -> str:
    """加载模板文件内容"""
    filepath = os.path.join(TEMPLATE_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()


class AnkiQuizGenerator:
    """Anki 测验卡片生成器"""

    def __init__(self, deck_name: str = config.ANKI_DECK_NAME):
        self.deck_name = deck_name
        self.model = self._create_model()
        self.deck = self._create_deck()

    def _create_model(self) -> genanki.Model:
        """创建 Anki 卡片模板（使用自定义交互式模板）"""
        front_html = _load_template_file("正面内容模板.html")
        back_html = _load_template_file("背面内容模板.html")
        css = _load_template_file("样式.css")

        model = genanki.Model(
            config.ANKI_MODEL_ID,
            config.ANKI_MODEL_NAME,
            fields=[
                {'name': '正面'},
                {'name': 'A'},
                {'name': 'B'},
                {'name': 'C'},
                {'name': 'D'},
                {'name': '答案'},
                {'name': '所在组'},
                {'name': '序号'},
                {'name': '解题思路'},
                {'name': '点拨内容'},
                {'name': '我的笔记'},
                {'name': '标题1'},
                {'name': '标题2'},
            ],
            templates=[
                {
                    'name': '选择题卡片',
                    'qfmt': front_html,
                    'afmt': back_html,
                },
            ],
            css=css,
        )
        return model

    def _create_deck(self) -> genanki.Deck:
        """创建 Anki 卡组"""
        deck_id = random.randrange(1 << 30, 1 << 31)
        return genanki.Deck(deck_id, self.deck_name)

    def add_quiz(self, quiz_data: Dict):
        """
        添加单个测验题目到卡组

        Args:
            quiz_data: 包含以下键的字典:
                - question: 问题文本
                - options: [{'label': 'A', 'text': '...'}, ...] 选项列表
                - answer: 正确答案字母（如 'A' 或 'AB'）
                - group: 所在组（可选）
                - index: 序号（可选）
                - explanation: 解题思路（可选）
                - tips: 点拨内容（可选）
                - note: 我的笔记（可选）
                - title1: 标题1（可选，默认"解题思路"）
                - title2: 标题2（可选，默认"点拨内容"）
        """
        # 构建各选项文本，缺失的选项留空
        option_map = {opt['label']: opt['text'] for opt in quiz_data['options']}

        note = genanki.Note(
            model=self.model,
            fields=[
                quiz_data['question'],                          # 正面
                option_map.get('A', ''),                        # A
                option_map.get('B', ''),                        # B
                option_map.get('C', ''),                        # C
                option_map.get('D', ''),                        # D
                quiz_data['answer'],                            # 答案
                quiz_data.get('group', ''),                     # 所在组
                str(quiz_data.get('index', quiz_data.get('id', ''))),  # 序号
                quiz_data.get('explanation', ''),               # 解题思路
                quiz_data.get('tips', ''),                      # 点拨内容
                quiz_data.get('note', ''),                      # 我的笔记
                quiz_data.get('title1', '解题思路'),            # 标题1
                quiz_data.get('title2', '点拨内容'),            # 标题2
            ]
        )

        self.deck.add_note(note)

    def generate_package(self, output_path: str):
        """生成 Anki 包文件"""
        output_dir = os.path.dirname(output_path)
        if output_dir and not os.path.exists(output_dir):
            os.makedirs(output_dir)

        package = genanki.Package(self.deck)
        package.write_to_file(output_path)
        print(f"\n已生成 Anki 卡片包: {output_path}")
        print(f"包含 {len(self.deck.notes)} 张卡片")

    def batch_add_quizzes(self, quizzes: List[Dict]):
        """批量添加测验题目"""
        for quiz in quizzes:
            try:
                self.add_quiz(quiz)
            except Exception as e:
                print(f"添加题目 {quiz.get('id', '?')} 时出错: {e}")
                continue

        print(f"\n已添加 {len(self.deck.notes)} 道题目到卡组")


def preview_quiz_card(quiz_data: Dict):
    """预览单个题目的卡片内容"""
    print("\n" + "="*60)
    print(f"题目 {quiz_data.get('id', '?')}:")
    print("-"*60)
    print(f"问题: {quiz_data['question']}")
    print("\n选项:")
    for option in quiz_data['options']:
        print(f"  {option['label']}. {option['text']}")
    print(f"\n正确答案: {quiz_data['answer']}")
    if quiz_data.get('explanation'):
        print(f"解题思路: {quiz_data['explanation']}")
    if quiz_data.get('tips'):
        print(f"点拨内容: {quiz_data['tips']}")
    print("="*60)
