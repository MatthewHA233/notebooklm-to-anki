"""
NotebookLM to Anki 主程序
"""
import os
import sys
from scraper import extract_from_html, manual_input_quiz
from anki_generator import AnkiQuizGenerator, preview_quiz_card
import config


def print_banner():
    """打印程序标题"""
    banner = """
    ╔═══════════════════════════════════════════════╗
    ║   NotebookLM to Anki 转换工具                ║
    ║   将 NotebookLM 测验转换为 Anki 卡片        ║
    ╚═══════════════════════════════════════════════╝
    """
    print(banner)


def show_menu():
    """显示主菜单"""
    print("\n请选择操作模式：")
    print("1. 启动服务器（推荐）- 配合 Chrome 插件使用")
    print("2. 从 HTML 文件提取 - 从已下载的网页文件提取")
    print("3. 手动输入 - 手动输入测验题目")
    print("4. 退出")
    print()


def server_mode():
    """启动本地转换服务器"""
    print("\n=== 启动服务器 ===")
    print("服务器将在前台运行，按 Ctrl+C 停止\n")

    # Import here to avoid requiring flask for other modes
    try:
        from server import app
    except ImportError:
        print("错误：缺少依赖，请运行: pip install flask flask-cors")
        return

    os.makedirs(config.OUTPUT_DIR, exist_ok=True)

    print("=" * 50)
    print("  NotebookLM to Anki — Conversion Server")
    print(f"  http://{config.SERVER_HOST}:{config.SERVER_PORT}")
    print("=" * 50)
    print("\n使用方法:")
    print("  1. 在 Chrome 中加载 chrome-extension/ 目录（开发者模式）")
    print("  2. 打开 NotebookLM 测验页面")
    print("  3. 点击插件图标 → Extract & Generate")
    print()

    app.run(
        host=config.SERVER_HOST,
        port=config.SERVER_PORT,
        debug=False,
    )


def html_extract_mode():
    """从 HTML 文件提取模式"""
    print("\n=== 从 HTML 文件提取 ===")
    print("使用方法：")
    print("  1. 在浏览器中打开 NotebookLM 测验页面")
    print("  2. Ctrl+S 保存网页（选择「网页，全部」）")
    print("  3. 将保存的 .html 文件路径粘贴到下方\n")

    html_path = input("请输入 HTML 文件路径: ").strip().strip('"').strip("'")

    if not html_path:
        print("路径不能为空")
        return None

    if not os.path.exists(html_path):
        print(f"文件不存在: {html_path}")
        return None

    return extract_from_html(html_path)


def manual_mode():
    """手动输入模式"""
    print("\n=== 手动输入模式 ===")
    return manual_input_quiz()


def verify_and_edit_quizzes(quizzes):
    """验证并编辑题目"""
    if not quizzes:
        return quizzes

    print(f"\n共 {len(quizzes)} 道题目")

    for quiz in quizzes:
        preview_quiz_card(quiz)

        edit = input("\n是否编辑此题目？(y/n，按 Enter 跳过): ").strip().lower()

        if edit == 'y':
            new_question = input(f"问题 [{quiz['question'][:50]}...]: ").strip()
            if new_question:
                quiz['question'] = new_question

            print("\n编辑选项（按 Enter 保持原值）:")
            for option in quiz['options']:
                new_text = input(f"  {option['label']}. [{option['text'][:40]}]: ").strip()
                if new_text:
                    option['text'] = new_text

            new_answer = input(f"正确答案 [{quiz['answer']}]: ").strip().upper()
            if new_answer:
                quiz['answer'] = new_answer

            new_explanation = input(f"解题思路 [按 Enter 保持]: ").strip()
            if new_explanation:
                quiz['explanation'] = new_explanation

            new_tips = input(f"点拨内容 [按 Enter 保持]: ").strip()
            if new_tips:
                quiz['tips'] = new_tips

    return quizzes


def generate_anki_package(quizzes):
    """生成 Anki 包"""
    if not quizzes:
        print("没有题目可以生成")
        return

    deck_name = input(f"\n请输入卡组名称 [默认: {config.ANKI_DECK_NAME}]: ").strip()
    if not deck_name:
        deck_name = config.ANKI_DECK_NAME

    output_filename = input(f"请输入输出文件名 [默认: {config.DEFAULT_OUTPUT_FILENAME}]: ").strip()
    if not output_filename:
        output_filename = config.DEFAULT_OUTPUT_FILENAME

    if not output_filename.endswith('.apkg'):
        output_filename += '.apkg'

    output_path = os.path.join(config.OUTPUT_DIR, output_filename)

    try:
        generator = AnkiQuizGenerator(deck_name=deck_name)
        generator.batch_add_quizzes(quizzes)
        generator.generate_package(output_path)

        print(f"\n文件位置: {os.path.abspath(output_path)}")
        print("下一步：在 Anki 中「文件」→「导入」，选择生成的 .apkg 文件")

    except Exception as e:
        print(f"生成失败: {e}")


def main():
    """主函数"""
    print_banner()

    while True:
        show_menu()
        choice = input("请选择 (1-4): ").strip()

        if choice == '1':
            server_mode()
            break  # Server runs until Ctrl+C, then exit
        elif choice == '2':
            quizzes = html_extract_mode()
        elif choice == '3':
            quizzes = manual_mode()
        elif choice == '4':
            print("\n再见！")
            sys.exit(0)
        else:
            print("无效选择，请重试")
            continue

        if choice in ('2', '3') and quizzes:
            verify = input("\n是否逐题验证和编辑？(y/n): ").strip().lower()
            if verify == 'y':
                quizzes = verify_and_edit_quizzes(quizzes)

            generate = input("\n是否生成 Anki 卡片包？(y/n): ").strip().lower()
            if generate == 'y':
                generate_anki_package(quizzes)

        if choice != '1':
            continue_choice = input("\n是否继续使用？(y/n): ").strip().lower()
            if continue_choice != 'y':
                print("\n再见！")
                break


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n程序已中断")
        sys.exit(0)
    except Exception as e:
        print(f"\n发生错误: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
