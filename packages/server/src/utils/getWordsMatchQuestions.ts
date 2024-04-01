import db from "../../db";
import { DbWordQuestion, Question } from "../../types/Question";

const WORDS_PER_QUESTION = 5;

const transform = (questions: DbWordQuestion[]): Question => {
  const questionsByParams = questions.reduce(
    (prev: any, question) => {
      prev.id.push(question.id);
      prev.en.push(question.en);
      prev.es.push(question.es);
      prev.learn_group.push(question.learn_group);
      return prev;
    },
    { id: [], en: [], es: [], learn_group: [] }
  );

  return {
    id: questionsByParams.id,
    question: questionsByParams.en,
    correctAnswer: questionsByParams.es,
    learnGroup: questionsByParams.learn_group,
    category: "WORDS_MATCH",
  };
};

const getWordsMatchQuestions = async (count: number): Promise<Question[]> => {
  const dbWords = await db.query(
    "SELECT * FROM words ORDER BY random() LIMIT $1",
    count * WORDS_PER_QUESTION
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

export default getWordsMatchQuestions;
