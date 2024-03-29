import express from "express";
import { Question } from "../types/Question";
import getTranslateWordQuestion, {
  DbWordQuestion,
} from "./utils/getTranslateWordQuestion";
import { getQuestion } from "./utils/checkAnswer";
import { getAudioBase64, getAudioUrl } from "google-tts-api";

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

router.post("/sound", async (req, res) => {
  const { questionId } = req.body;

  if (!questionId) {
    res.status(400).json({ errorMessage: "Wrong input params: questionId" });
    return;
  }
  const question: DbWordQuestion | undefined = getQuestion(String(questionId));

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
