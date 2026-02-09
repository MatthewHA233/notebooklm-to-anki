"""
测试 Anki 生成功能
使用示例数据快速测试卡片生成（使用自定义交互式模板）
"""
import json
import os
from anki_generator import AnkiQuizGenerator, preview_quiz_card


def load_example_data():
    """加载示例数据"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(script_dir, 'example_quiz_data.json')
    with open(data_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def test_anki_generation():
    """测试 Anki 卡片生成"""
    print("="*60)
    print("测试 Anki 卡片生成（自定义交互式模板）")
    print("="*60)

    # 加载示例数据
    print("\n加载示例数据...")
    quizzes = load_example_data()
    print(f"加载了 {len(quizzes)} 道示例题目")

    # 预览题目
    print("\n预览题目：")
    for quiz in quizzes:
        preview_quiz_card(quiz)

    # 创建生成器
    print("\n创建 Anki 生成器...")
    generator = AnkiQuizGenerator(deck_name="测试卡组")
    print("生成器创建成功")

    # 添加题目
    print("\n添加题目到卡组...")
    generator.batch_add_quizzes(quizzes)

    # 生成包
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, "output", "test_quiz.apkg")
    generator.generate_package(output_path)

    print("\n" + "="*60)
    print("测试完成！")
    print(f"生成的文件：{os.path.abspath(output_path)}")
    print("\n请在 Anki 中导入此文件验证卡片效果。")
    print("卡片支持：交互式选择、随机排序、倒计时、正误统计等功能")
    print("="*60)


if __name__ == "__main__":
    try:
        test_anki_generation()
    except FileNotFoundError as e:
        print(f"错误：找不到文件 - {e}")
        print("请确保 Anki卡片模板 目录和 example_quiz_data.json 都存在")
    except Exception as e:
        print(f"测试失败: {e}")
        import traceback
        traceback.print_exc()
