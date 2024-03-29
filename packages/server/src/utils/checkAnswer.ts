import words from "../db/words.json";
import { QuestionDoesNotExistError } from "../errors";
import { DbWordQuestion } from "./getTranslateWordQuestion";

export const getQuestion = (questionId: string): DbWordQuestion | undefined => {
  return words.find(({ id }) => id === questionId);
};

// removes spaces from the beginning and the end of a string (trim)
// replaces accents, removes unprintable ranges
const normalizeAnswer = (answer: string): string => {
  return answer
    .trim()
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const checkAnswer = (questionId: string, answer: string): boolean => {
  const question: DbWordQuestion | undefined = getQuestion(questionId);

  if (!question) {
    throw new QuestionDoesNotExistError("Question does not exist");
  }

  const normalizedCorrectAnswer = normalizeAnswer(question.es);
  const normalizedAnswer = normalizeAnswer(answer);

  return normalizedCorrectAnswer === normalizedAnswer;
};

export default checkAnswer;
