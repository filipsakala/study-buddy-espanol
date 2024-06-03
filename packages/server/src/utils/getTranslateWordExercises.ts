import db from "../../db";
import { DbWord, Exercise } from "../../types/Exercise";
import getSqlCondition from "./getSqlCondition";

const transform = (exercise: DbWord): Exercise => {
  return {
    category: "TRANSLATE_WORD",
    questions: [
      {
        id: exercise.id,
        icon: exercise.icon,
        textEn: exercise.en,
        learnGroup: exercise.learn_group,
      },
    ],
  };
};

const getTranslateWordExercises = async (
  count: number,
  learn_group?: string | string[]
): Promise<Exercise[]> => {
  const { whereConditions, whereParams } = getSqlCondition(learn_group);

  const dbExercises = await db.query(
    `SELECT * FROM words WHERE ${whereConditions} ORDER BY random() LIMIT $1`,
    [count, ...whereParams]
  );

  return dbExercises.map(transform);
};

export default getTranslateWordExercises;
