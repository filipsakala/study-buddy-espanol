import db from "../../db";
import { DbWord, Exercise } from "../../types/Exercise";
import getRandomIndexes from "./getRandomIndexes";
import getSqlCondition from "./getSqlCondition";

const WORDS_PER_EXERCISE = 5;

const transform = (exercises: DbWord[]): Exercise => {
  const answers = getRandomIndexes(exercises.length).map(
    (index) => exercises[index].es
  );

  return {
    category: "WORDS_MATCH",
    questions: exercises.map((exercise, index) => ({
      id: exercise.id,
      icon: exercise.icon,
      textEn: exercise.en,
      randomizedAnswer: answers[index],
      learnGroup: exercise.learn_group,
    })),
  };
};

const getWordsMatchExercises = async (
  count: number,
  learn_group?: string | string[],
  course?: string
): Promise<Exercise[]> => {
  const { whereConditions, whereParams } = getSqlCondition(learn_group, course);
  const dbWords = await db.query(
    `SELECT * FROM words WHERE ${whereConditions} ORDER BY random() LIMIT $1`,
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

export default getWordsMatchExercises;
