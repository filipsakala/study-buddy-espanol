import words from "../db/words.json";
import { QuestionDoesNotExistError } from "../errors";
import { DbWordQuestion } from "./getTranslateWordQuestion";

const getQuestion = (questionId: string): DbWordQuestion | undefined => {
  return words.find(({ id }) => id === questionId);
};

// removes spaces from the beginning and the end of a string (trim)
const normalizeAnswer = (answer: string): string => {
  return answer.trim().toLocaleLowerCase();
};

const checkAnswer = (questionId: string, answer: string): boolean => {
  const question: DbWordQuestion | undefined = getQuestion(questionId);

  if (!question) {
    throw new QuestionDoesNotExistError("Question does not exist");
  }

  const normalizedAnswer = normalizeAnswer(answer);

  return question.es === normalizedAnswer;
};

export default checkAnswer;
