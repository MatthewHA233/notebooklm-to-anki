/**
 * 测验数据转换模块
 * 移植自 scraper.py 的 _process_quiz_data() 和 _convert_to_anki_format()
 *
 * 输入: 原始 NotebookLM quiz JSON { quiz: [...], topics: {...} }
 * 输出: Anki 格式题目数组
 */

/**
 * 处理原始 quiz JSON 数据
 * @param {Object} quizData - { quiz: [...], topics: { covered: [...] } }
 * @returns {Array} Anki 格式的题目数组
 */
function processQuizData(quizData) {
  if (!quizData || !Array.isArray(quizData.quiz) || quizData.quiz.length === 0) {
    throw new Error("Invalid quiz data: no questions found");
  }

  const quizList = quizData.quiz;
  const topics = quizData.topics || {};

  const covered = topics.covered || [];
  let groupName = covered.slice(0, 3).join(", ");
  if (covered.length > 3) {
    groupName += " ...";
  }

  return convertToAnkiFormat(quizList, groupName);
}

/**
 * 将 NotebookLM 的 quiz JSON 转换为 Anki 生成器所需的格式
 * @param {Array} quizList - NotebookLM 原始题目列表
 * @param {string} groupName - 分组名称
 * @returns {Array} 转换后的题目数组
 */
function convertToAnkiFormat(quizList, groupName) {
  return quizList.map((item, idx) => {
    const question = item.question || "";
    const answerOptions = item.answerOptions || [];
    const hintText = item.hint || "";

    const options = [];
    const correctLabels = [];
    const rationalesCorrect = [];
    const rationalesWrong = [];

    answerOptions.forEach((opt, i) => {
      if (i >= OPTION_LABELS.length) return;

      const label = OPTION_LABELS[i];
      const text = opt.text || "";
      const isCorrect = opt.isCorrect || false;
      const rationale = opt.rationale || "";

      options.push({ label, text });

      if (isCorrect) {
        correctLabels.push(label);
        rationalesCorrect.push(`<b>${label}. ${text}</b>：${rationale}`);
      } else {
        rationalesWrong.push(`${label}. ${text}：${rationale}`);
      }
    });

    const answer = correctLabels.join("");

    // 解题思路：正确选项的 rationale
    const explanation = rationalesCorrect.join("<br>");

    // 点拨内容：hint + 错误选项排除分析
    const tipsParts = [];
    if (hintText) {
      tipsParts.push(`<b>提示：</b>${hintText}`);
    }
    if (rationalesWrong.length > 0) {
      tipsParts.push("<b>排除分析：</b>");
      tipsParts.push(...rationalesWrong);
    }
    const tips = tipsParts.join("<br>");

    return {
      id: idx + 1,
      question,
      options,
      answer,
      group: groupName,
      explanation,
      tips,
      title1: "解题思路",
      title2: "点拨",
    };
  });
}
