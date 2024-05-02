import express from "express";
import { DbWordQuestion, Question } from "../types/Question";
import { getAudioBase64 } from "google-tts-api";
import getQuestion from "./utils/getQuestion";
import getQuestions from "./utils/getQuestions";

const router = express.Router();

router.get("/", async (req, res) => {
  const { count, learnGroup } = req.query;

  if (!count || !Number(count) || Number(count) > 10) {
    res.status(400).json({ errorMessage: "Wrong input params: count" });
    return;
  }

  try {
    const questions: Question[] = await getQuestions(
      Number(count) || 0,
      learnGroup as any
    );

    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errorMessage: "General server error while loading questions" });
  }
});

router.post("/sound", async (req, res) => {
  const { questionId } = req.body;

  if (!questionId) {
    res.status(400).json({ errorMessage: "Wrong input params: questionId" });
    return;
  }
  const question: DbWordQuestion | null | undefined = await getQuestion(
    questionId
  );

  if (!question) {
    res.status(400).json({ errorMessage: "Wrong input params: questionId" });
    return;
  }

  try {
    const audioBase64 = await getAudioBase64(question.es, {
      lang: "es",
      slow: false,
      host: "https://translate.google.com",
      timeout: 10000,
    });

    res.status(200).json(audioBase64);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errorMessage: "General server error while fetching answer result",
    });
  }
});

export default router;
