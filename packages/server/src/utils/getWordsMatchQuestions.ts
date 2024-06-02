import db from "../../db";
import { DbWord, Question } from "../../types/Question";
import getRandomIndexes from "./getRandomIndexes";
import getSqlCondition from "./getSqlCondition";

const WORDS_PER_QUESTION = 5;

const transform = (questions: DbWord[]): Question => {
  const answers = getRandomIndexes(questions.length).map(
    (index) => questions[index].es
  );

  return {
    category: "WORDS_MATCH",
    questions: questions.map((question, index) => ({
      id: question.id,
      icon: question.icon,
      textEn: question.en,
      randomizedAnswer: answers[index],
      learnGroup: question.learn_group,
    })),
  };
};

const getWordsMatchQuestions = async (
  count: number,
  learn_group?: string | string[]
): Promise<Question[]> => {
  const { whereConditions, whereParams } = getSqlCondition(learn_group);
  const dbWords = await db.query(
    `SELECT * FROM words WHERE ${whereConditions} ORDER BY random() LIMIT $1`,
    [count * WORDS_PER_QUESTION, ...whereParams]
  );
  // produce groups of words
  const dbQuestions = dbWords.reduce(
    (prev: DbWord[][], dbWord: DbWord, i: number) => {
      const groupIndex = Math.floor(i / WORDS_PER_QUESTION);
      prev[groupIndex].push(dbWord);
      return prev;
    },
    [...Array(count)].map(() => [])
  );

  return dbQuestions.map(transform);
};

export default getWordsMatchQuestions;
