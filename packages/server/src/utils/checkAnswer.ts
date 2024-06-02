import { DbWord, QuestionCategory } from "../../types/Question";
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

const performCheck = (answered: string, correct: string): boolean => {
  const normalizedAnswer = normalizeAnswer(answered);
  const normalizedCorrectAnswer = normalizeAnswer(correct);

  return normalizedCorrectAnswer === normalizedAnswer;
};

const checkAnswer = async (
  questionId: number,
  answer: string,
  category: QuestionCategory
): Promise<boolean> => {
  const question: DbWord | null | undefined = await getQuestion(questionId);

  if (!question) {
    throw new QuestionDoesNotExistError("Question does not exist");
  }

  if (category === "TRANSLATE_WORD" || category === "WORDS_MATCH") {
    return performCheck(answer, question.es);
  }

  if (category === "ARTICLES" && question.gender) {
    return performCheck(answer, question.gender);
  }

  return false;
};

export default checkAnswer;
