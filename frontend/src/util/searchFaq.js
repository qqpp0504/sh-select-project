import FAQDATA from "../faqData.js";

export function searchFAQ(keyword) {
  const results = [];
  const lowerKeyword = keyword.toLowerCase();

  FAQDATA.forEach((categoryItem) => {
    const category = categoryItem.category;

    categoryItem.questions.forEach((questionItem) => {
      // 將 keyword 標準化為字串
      const keywords = Array.isArray(questionItem.keyword)
        ? questionItem.keyword.join(" ")
        : questionItem.keyword;

      const question = questionItem.question;

      // 如果 keyword 包含使用者輸入，則加入結果
      if (
        keywords.toLowerCase().replace(/\s+/g, "").includes(lowerKeyword) ||
        question.toLowerCase().replace(/\s+/g, "").includes(lowerKeyword) ||
        category.toLowerCase().replace(/\s+/g, "").includes(lowerKeyword)
      ) {
        results.push({
          category: categoryItem.category,
          id: questionItem.id,
          question: questionItem.question,
          keywords: questionItem.keyword,
        });
      }
    });
  });

  return results;
}
