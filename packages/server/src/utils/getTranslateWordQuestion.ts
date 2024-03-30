import db from "../../db";
import {
  DbWordQuestion,
  Question,
  QuestionLearnGroup,
} from "../../types/Question";

const transform = (question: DbWordQuestion): Question => {
  return {
    id: question.id,
    icon: question.icon,
    question: question.en,
    correctAnswer: question.es,
    learnGroup: question.learn_group as QuestionLearnGroup,
    category: "TRANSLATE_WORD",
    answers: [],
  };
};

const getTranslateWordQuestion = async (count: number): Promise<Question[]> => {
  const dbQuestions = await db.query(
    "SELECT * FROM words ORDER BY random() LIMIT $1",
    count
  );

  return dbQuestions.map((dbQuestion: DbWordQuestion) => transform(dbQuestion));
};

export default getTranslateWordQuestion;
