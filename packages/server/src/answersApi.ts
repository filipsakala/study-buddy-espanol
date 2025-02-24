import express from "express";
import checkAnswer from "./utils/checkAnswer";
import { QuestionDoesNotExistError } from "./errors";

const router = express.Router();

router.post("/", async (req, res) => {
  const { questionId, answer, category, questionParam } = req.body;

  if (!questionId) {
    res.status(400).json({ errorMessage: "Wrong input params: questionId" });
    return;
  }

  if (!answer) {
    res.status(400).json({ errorMessage: "Wrong input params: answer" });
    return;
  }

  if (!category) {
    res.status(400).json({ errorMessage: "Wrong input params: category" });
    return;
  }

  try {
    const result = await checkAnswer(
      questionId,
      answer,
      category,
      questionParam
    );

    res.status(200).json(result);
  } catch (error) {
    if (error instanceof QuestionDoesNotExistError) {
      res.status(400).json({ errorMessage: error.message });
      return;
    }

    console.error(error);
    res.status(500).json({
      errorMessage: "General server error while fetching answer result",
    });
  }
});

export default router;
