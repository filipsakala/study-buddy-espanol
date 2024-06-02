import { Question, QuestionCategory } from "../../types/Question";
import getArticlesQuestions from "./getArticlesQuestions";
import getTranslateWordQuestions from "./getTranslateWordQuestions";
import getWordsMatchQuestions from "./getWordsMatchQuestions";

const TRANSLATE_WORD_QUESTION_PROBABILITY = 0.7;
const ARTICLES_QUESTION_PROBABILITY = 0.1;

const pickRandomCategory = (): QuestionCategory => {
  const randomNumber = Math.random();

  if (randomNumber < TRANSLATE_WORD_QUESTION_PROBABILITY) {
    return "TRANSLATE_WORD";
  }
  if (
    randomNumber <
    TRANSLATE_WORD_QUESTION_PROBABILITY + ARTICLES_QUESTION_PROBABILITY
  ) {
    return "ARTICLES";
  }
  return "WORDS_MATCH";
};

const getQuestionCategories = (count: number) => {
  const categoryCounts = { TRANSLATE_WORD: 0, WORDS_MATCH: 0, ARTICLES: 0 };

  const questionCategories = [...Array(count)].map((_) => {
    const randomCategory = pickRandomCategory();
    categoryCounts[randomCategory] = categoryCounts[randomCategory] + 1;
    return randomCategory;
  });

  return { questionCategories, categoryCounts };
};

const getQuestions = async (
  count: number,
  learnGroup?: string | string[]
): Promise<Question[]> => {
  const { questionCategories, categoryCounts } = getQuestionCategories(count);

  const translateWordQuestions: Question[] = await getTranslateWordQuestions(
    categoryCounts.TRANSLATE_WORD,
    learnGroup
  );
  const articlesQuestions: Question[] = await getArticlesQuestions(
    categoryCounts.ARTICLES,
    learnGroup
  );
  const wordMatchQuestions: Question[] = await getWordsMatchQuestions(
    categoryCounts.WORDS_MATCH,
    learnGroup
  );

  // shuffle questions according to given order
  let translateWordIndex = 0;
  let articlesIndex = 0;
  let wordMatchIndex = 0;
  return questionCategories.map((category) => {
    if (category === "TRANSLATE_WORD") {
      const nextQuestion = translateWordQuestions[translateWordIndex];
      translateWordIndex += 1;
      return nextQuestion;
    }
    if (category === "ARTICLES") {
      const nextQuestion = articlesQuestions[articlesIndex];
      articlesIndex += 1;
      return nextQuestion;
    }
    // WORD_MATCH
    const nextQuestion = wordMatchQuestions[wordMatchIndex];
    wordMatchIndex += 1;

    return nextQuestion;
  });
};

export default getQuestions;
