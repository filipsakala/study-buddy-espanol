import db from "../../db";
import { DbWordQuestion, Question } from "../../types/Question";
import getSqlCondition from "./getSqlCondition";

const WORDS_PER_QUESTION = 5;

const transform = (questions: DbWordQuestion[]): Question => {
  const questionsByParams = questions.reduce(
    (prev: any, question) => {
      prev.id.push(question.id);
      prev.icon.push(question.icon);
      prev.en.push(question.en);
      prev.es.push(question.es);
      prev.learn_group.push(question.learn_group);
      prev.gender.push(question.gender);
      prev.isSingular.push(question.is_singular);
      return prev;
    },
    {
      id: [],
      icon: [],
      en: [],
      es: [],
      learn_group: [],
      gender: [],
      isSingular: [],
    }
  );

  return {
    id: questionsByParams.id,
    icon: questionsByParams.icon,
    question: questionsByParams.en,
    correctAnswer: questionsByParams.es,
    learnGroup: questionsByParams.learn_group,
    gender: questionsByParams.gender,
    isSingular: questionsByParams.isSingular,
    category: "ARTICLES",
  };
};

const getArticlesQuestions = async (
  count: number,
  learn_group?: string | string[]
): Promise<Question[]> => {
  const { whereConditions, whereParams } = getSqlCondition(learn_group);

  const dbWords = await db.query(
    `SELECT * FROM words WHERE ${whereConditions} AND gender IS NOT NULL AND is_singular IS NOT NULL ORDER BY random() LIMIT $1`,
    [count * WORDS_PER_QUESTION, ...whereParams]
  );
  // produce groups of words
  const dbQuestions = dbWords.reduce(
    (prev: DbWordQuestion[][], dbWord: DbWordQuestion, i: number) => {
      const groupIndex = Math.floor(i / WORDS_PER_QUESTION);
      prev[groupIndex].push(dbWord);
      return prev;
    },
    [...Array(count)].map(() => [])
  );

  return dbQuestions.map((dbQuestion: DbWordQuestion[]) =>
    transform(dbQuestion)
  );
};

export default getArticlesQuestions;
