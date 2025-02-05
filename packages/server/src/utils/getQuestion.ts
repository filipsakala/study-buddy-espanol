import db from "../../db";
import { DbVerb, DbWord } from "../../types/Exercise";

const getQuestion = (
  questionId: string
): Promise<DbWord | DbVerb | null | undefined> => {
  if (questionId.startsWith("ADV"))
    return db.oneOrNone("SELECT * FROM verbs WHERE id = $1", questionId);
  return db.oneOrNone("SELECT * FROM words WHERE id = $1", questionId);
};

export default getQuestion;
