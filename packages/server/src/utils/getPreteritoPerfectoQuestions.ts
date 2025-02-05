import db from "../../db";
import { DbVerb, Exercise } from "../../types/Exercise";

const WORDS_PER_EXERCISE = 5;

const transform = (exercises: DbVerb[]): Exercise => {
  return {
    category: "PRETERITO_PERFECTO",
    questions: exercises.map((exercise) => ({
      id: exercise.id,
      textEs: exercise.infinitivo,
      randomizedAnswer: String(Math.round(Math.random() * 5) + 1),
    })),
  };
};

const getPreteritoPerfectoQuestions = async (
  count: number
): Promise<Exercise[]> => {
  const dbVerbs = await db.query(
    `SELECT id, infinitivo FROM verbs ORDER BY random() LIMIT $1`,
    [count * WORDS_PER_EXERCISE]
  );
  // produce groups of words
  const dbExercises = dbVerbs.reduce(
    (prev: DbVerb[][], dbVerb: DbVerb, i: number) => {
      const groupIndex = Math.floor(i / WORDS_PER_EXERCISE);
      prev[groupIndex].push(dbVerb);
      return prev;
    },
    [...Array(count)].map(() => [])
  );

  return dbExercises.map(transform);
};

export default getPreteritoPerfectoQuestions;
