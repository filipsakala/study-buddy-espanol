import db from "../../db";
import { DbWord, Question } from "../../types/Question";
import getSqlCondition from "./getSqlCondition";

const WORDS_PER_QUESTION = 5;

const transform = (questions: DbWord[]): Question => {
  return {
    category: "ARTICLES",
    questions: questions.map((question) => ({
      id: question.id,
      icon: question.icon,
      textEn: question.en,
      textEs: question.es,
      learnGroup: question.learn_group,
      gender: question.gender,
      isSingular: question.is_singular,
    })),
  };
};

const getArticlesQuestions = async (
  count: number,
  learn_group?: string | string[]
): Promise<Question[]> => {
  const { whereConditions, whereParams } = getSqlCondition(learn_group);

  const dbWords = await db.query(
    `SELECT * FROM words WHERE ${whereConditions} ` +
      `AND gender IS NOT NULL ` +
      `AND is_singular IS NOT NULL ` +
      `ORDER BY random() LIMIT $1`,
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

export default getArticlesQuestions;
