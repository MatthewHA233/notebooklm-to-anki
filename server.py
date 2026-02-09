"""
NotebookLM to Anki — Local conversion server

Receives quiz JSON from the Chrome extension and returns an .apkg file.

Usage:
    python server.py
"""
import io
import tempfile
import os

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

from scraper import _process_quiz_data
from anki_generator import AnkiQuizGenerator
import config

app = Flask(__name__)
CORS(app, origins=[
    "chrome-extension://*",
])


@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint for the Chrome extension."""
    return jsonify({"status": "ok"})


@app.route("/convert", methods=["POST"])
def convert():
    """
    Convert NotebookLM quiz JSON to an .apkg file.

    Expects JSON body:
        {
            "quiz_data": { "quiz": [...], "topics": {...} },
            "deck_name": "optional deck name"
        }

    Returns:
        .apkg binary file
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "Request body must be JSON"}), 400

    quiz_data = data.get("quiz_data")
    if not quiz_data:
        return jsonify({"error": "Missing 'quiz_data' field"}), 400

    quiz_list = quiz_data.get("quiz")
    if not quiz_list:
        return jsonify({"error": "No quiz questions found in data"}), 400

    deck_name = data.get("deck_name") or config.ANKI_DECK_NAME

    try:
        quizzes = _process_quiz_data(quiz_data)
    except Exception as e:
        return jsonify({"error": f"Failed to process quiz data: {e}"}), 400

    if not quizzes:
        return jsonify({"error": "No quizzes could be extracted"}), 400

    try:
        generator = AnkiQuizGenerator(deck_name=deck_name)
        generator.batch_add_quizzes(quizzes)

        # Write to a temp file and send it back
        tmp = tempfile.NamedTemporaryFile(
            suffix=".apkg", delete=False, dir=config.OUTPUT_DIR
        )
        tmp_path = tmp.name
        tmp.close()

        generator.generate_package(tmp_path)

        return send_file(
            tmp_path,
            mimetype="application/octet-stream",
            as_attachment=True,
            download_name=config.DEFAULT_OUTPUT_FILENAME,
        )
    except Exception as e:
        return jsonify({"error": f"Failed to generate Anki package: {e}"}), 500
    finally:
        # Clean up temp file after sending
        if "tmp_path" in locals() and os.path.exists(tmp_path):
            try:
                os.unlink(tmp_path)
            except OSError:
                pass


if __name__ == "__main__":
    # Ensure output directory exists
    os.makedirs(config.OUTPUT_DIR, exist_ok=True)

    print("=" * 50)
    print("  NotebookLM to Anki — Conversion Server")
    print(f"  http://{config.SERVER_HOST}:{config.SERVER_PORT}")
    print("=" * 50)
    print("\nReady. Use the Chrome extension to convert quizzes.\n")

    app.run(
        host=config.SERVER_HOST,
        port=config.SERVER_PORT,
        debug=False,
    )
