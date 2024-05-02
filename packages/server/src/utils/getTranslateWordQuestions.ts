import db from "../../db";
import { DbWordQuestion, Question } from "../../types/Question";
import getSqlCondition from "./getSqlCondition";

const transform = (question: DbWordQuestion): Question => {
  return {
    id: question.id,
    icon: question.icon,
    question: question.en,
    correctAnswer: question.es,
    learnGroup: question.learn_group,
    category: "TRANSLATE_WORD",
  };
};

const getTranslateWordQuestions = async (
  count: number,
  learn_group?: string | string[]
): Promise<Question[]> => {
  const { whereConditions, whereParams } = getSqlCondition(learn_group);

  const dbQuestions = await db.query(
    `SELECT * FROM words WHERE ${whereConditions} ORDER BY random() LIMIT $1`,
    [count, ...whereParams]
  );

  return dbQuestions.map((dbQuestion: DbWordQuestion) => transform(dbQuestion));
};

export default getTranslateWordQuestions;
