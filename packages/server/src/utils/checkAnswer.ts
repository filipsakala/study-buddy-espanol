import db from "../../db";
import { DbWordQuestion } from "../../types/Question";
import { QuestionDoesNotExistError } from "../errors";
import getQuestion from "./getQuestion";

// removes spaces from the beginning and the end of a string (trim)
// replaces accents, removes unprintable ranges
const normalizeAnswer = (answer: string): string => {
  return answer
    .trim()
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const checkAnswer = async (
  questionId: number,
  answer: string
): Promise<boolean> => {
  const question: DbWordQuestion | null | undefined = await getQuestion(
    questionId
  );

  if (!question) {
    throw new QuestionDoesNotExistError("Question does not exist");
  }

  const normalizedCorrectAnswer = normalizeAnswer(question.es);
  const normalizedAnswer = normalizeAnswer(answer);

  return normalizedCorrectAnswer === normalizedAnswer;
};

export default checkAnswer;
