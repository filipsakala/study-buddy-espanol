import db from "../../db";
import { DbWord, Question } from "../../types/Question";
import getSqlCondition from "./getSqlCondition";

const transform = (question: DbWord): Question => {
  return {
    category: "TRANSLATE_WORD",
    questions: [
      {
        id: question.id,
        icon: question.icon,
        textEn: question.en,
        learnGroup: question.learn_group,
      },
    ],
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

  return dbQuestions.map(transform);
};

export default getTranslateWordQuestions;
