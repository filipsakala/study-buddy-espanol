import { DbVerb, DbWord, ExerciseCategory } from "../../types/Exercise";
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

const getCorrectAnswerParam = (
  category: ExerciseCategory | string,
  questionParam?: string
): keyof DbWord | keyof DbVerb => {
  switch (category) {
    case "TRANSLATE_WORD":
    case "WORDS_MATCH":
      return "es";
    case "ARTICLES":
      return "gender";
    case "PRETERITO_PERFECTO":
      return "participio";
    case "PRETERITO_INDEFINIDO":
      return `preterito_indefinido_${questionParam}` as keyof DbVerb;
    default:
      throw new QuestionDoesNotExistError(`Unknown category ${category}`);
  }
};

const checkAnswer = async (
  questionId: string,
  answer: string,
  category: ExerciseCategory | string,
  questionParam?: string
): Promise<{ result: boolean; correctAnswer?: string }> => {
  const question: DbWord | DbVerb | null | undefined = await getQuestion(
    questionId
  );

  if (!question) {
    throw new QuestionDoesNotExistError("Question does not exist");
  }

  const answerParam = getCorrectAnswerParam(category, questionParam);
  // @ts-ignore
  const correctAnswer = question[answerParam];
  const result = performCheck(answer, correctAnswer);
  return { result, correctAnswer };
};

export default checkAnswer;
