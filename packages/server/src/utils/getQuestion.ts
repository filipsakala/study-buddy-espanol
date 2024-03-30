import db from "../../db";
import { DbWordQuestion } from "../../types/Question";

const getQuestion = (
  questionId: number
): Promise<DbWordQuestion | null | undefined> => {
  return db.oneOrNone("SELECT * FROM words WHERE id = $1", questionId);
};

export default getQuestion;
