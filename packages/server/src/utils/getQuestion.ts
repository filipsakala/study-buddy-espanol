import db from "../../db";
import { DbWord } from "../../types/Question";

const getQuestion = (
  questionId: number
): Promise<DbWord | null | undefined> => {
  return db.oneOrNone("SELECT * FROM words WHERE id = $1", questionId);
};

export default getQuestion;
