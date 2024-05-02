import { Question, QuestionCategory } from "../../types/Question";
import getTranslateWordQuestions from "./getTranslateWordQuestions";
import getWordsMatchQuestions from "./getWordsMatchQuestions";

const TRANSLATE_WORD_QUESTION_PROBABILITY = 0.7;

const selectQuestionCategory = (): QuestionCategory => {
  const randomNumber = Math.random();

  if (randomNumber < TRANSLATE_WORD_QUESTION_PROBABILITY) {
    return "TRANSLATE_WORD";
  }
  return "WORDS_MATCH";
};

const getQuestionCategories = (count: number) => {
  const categoryCounts = { TRANSLATE_WORD: 0, WORDS_MATCH: 0 };

  const questionCategories = [...Array(count)].map((_) => {
    const randomCategory = selectQuestionCategory();
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
  const wordMatchQuestions: Question[] = await getWordsMatchQuestions(
    categoryCounts.WORDS_MATCH,
    learnGroup
  );

  // shuffle questions according to given order
  let translateWordIndex = 0;
  let wordMatchIndex = 0;
  return questionCategories.map((category) => {
    if (category === "TRANSLATE_WORD") {
      const nextQuestion = translateWordQuestions[translateWordIndex];
      translateWordIndex += 1;
      return nextQuestion;
    }
    // WORD_MATCH
    const nextQuestion = wordMatchQuestions[wordMatchIndex];
    wordMatchIndex += 1;
    return nextQuestion;
  });
};

export default getQuestions;
