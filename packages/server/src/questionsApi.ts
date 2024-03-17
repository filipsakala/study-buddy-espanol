import express from "express";
import { Question } from "../types/Question";
import getTranslateWordQuestion from "./utils/getTranslateWordQuestion";

const router = express.Router();

router.get("/", async (req, res) => {
  const { count } = req.query;

  if (!count || !Number(count) || Number(count) > 10) {
    res.status(400).json({ errorMessage: "Wrong input params: count" });
    return;
  }

  try {
    const questions: Question[] = getTranslateWordQuestion(Number(count) || 0);

    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errorMessage: "General server error while loading questions" });
  }
});

export default router;
