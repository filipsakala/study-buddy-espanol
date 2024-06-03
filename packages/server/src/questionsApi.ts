import express from "express";
import { DbWord, Question } from "../types/Question";
import { getAudioBase64 } from "google-tts-api";
import getQuestion from "./utils/getQuestion";
import getQuestions from "./utils/getQuestions";
import getQuestionHelp from "./utils/getQuestionHelp";
import { IncorrectCurrentHelpError } from "./errors";

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

router.get("/help", async (req, res) => {
  const { id, current } = req.query;

  if (!id || !Number(id)) {
    res.status(400).json({ errorMessage: "Wrong input params: id, current" });
    return;
  }

  const question: DbWord | null | undefined = await getQuestion(Number(id));

  if (!question) {
    res.status(400).json({ errorMessage: "Wrong input params: id" });
    return;
  }

  try {
    const currentHelp = current === undefined ? undefined : String(current);
    const help = getQuestionHelp(question, currentHelp);
    res.status(200).json(help);
  } catch (error) {
    if (error instanceof IncorrectCurrentHelpError) {
      res.status(400).json({ errorMessage: "Wrong input params: current" });
      return;
    }

    console.error(error);
    res.status(500).json({
      errorMessage: "General server error while fetching answer result",
    });
  }
});

router.post("/sound", async (req, res) => {
  const { questionId } = req.body;

  if (!questionId) {
    res.status(400).json({ errorMessage: "Wrong input params: questionId" });
    return;
  }
  const question: DbWord | null | undefined = await getQuestion(questionId);

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
