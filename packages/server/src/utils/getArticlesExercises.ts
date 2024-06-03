import db from "../../db";
import { DbWord, Exercise } from "../../types/Exercise";
import getSqlCondition from "./getSqlCondition";

const WORDS_PER_EXERCISE = 5;

const transform = (exercises: DbWord[]): Exercise => {
  return {
    category: "ARTICLES",
    questions: exercises.map((exercise) => ({
      id: exercise.id,
      icon: exercise.icon,
      textEn: exercise.en,
      textEs: exercise.es,
      learnGroup: exercise.learn_group,
      gender: exercise.gender,
      isSingular: exercise.is_singular,
    })),
  };
};

const getArticlesExercises = async (
  count: number,
  learn_group?: string | string[]
): Promise<Exercise[]> => {
  const { whereConditions, whereParams } = getSqlCondition(learn_group);

  const dbWords = await db.query(
    `SELECT * FROM words WHERE ${whereConditions} ` +
      `AND gender IS NOT NULL ` +
      `AND is_singular IS NOT NULL ` +
      `ORDER BY random() LIMIT $1`,
    [count * WORDS_PER_EXERCISE, ...whereParams]
  );
  // produce groups of words
  const dbExercises = dbWords.reduce(
    (prev: DbWord[][], dbWord: DbWord, i: number) => {
      const groupIndex = Math.floor(i / WORDS_PER_EXERCISE);
      prev[groupIndex].push(dbWord);
      return prev;
    },
    [...Array(count)].map(() => [])
  );

  return dbExercises.map(transform);
};

export default getArticlesExercises;
