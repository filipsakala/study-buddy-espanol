import { Question } from "../../types/Question";
import words from "../db/words.json";
import getQuestionsIndexes from "./getQuestionsIndexes";

const DB_QUESTION_COUNT = words.length;
type DbQuestion = (typeof words)[0];

const transform = (question: DbQuestion): Question => {
  return {
    icon: question.icon,
    question: question.en,
    correctAnswer: question.es,
    category: "TRANSLATE_WORD",
    answers: [],
  };
};

const getTranslateWordQuestion = (count: number): Question[] => {
  const questionIndexes = getQuestionsIndexes(count, DB_QUESTION_COUNT);

  return questionIndexes.map((index) => transform(words[index]));
};

export default getTranslateWordQuestion;
