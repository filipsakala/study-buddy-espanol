import express from "express";
import { DbWord, Exercise } from "../types/Exercise";
import { getAudioBase64 } from "google-tts-api";
import getQuestion from "./utils/getQuestion";
import getExercises from "./utils/getExercises";
import getQuestionHelp from "./utils/getQuestionHelp";
import { IncorrectCurrentHelpError } from "./errors";

const router = express.Router();

router.get("/", async (req, res) => {
  const { count, learnGroup, course } = req.query;

  if (!count || !Number(count) || Number(count) > 10) {
    res.status(400).json({ errorMessage: "Wrong input params: count" });
    return;
  }

  try {
    const exercises: Exercise[] = await getExercises(
      Number(count) || 0,
      learnGroup as any,
      course as any
    );

    res.status(200).json(exercises);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errorMessage: "General server error while loading exercises" });
  }
});

router.get("/help", async (req, res) => {
  const { id, current } = req.query;

  if (!id || !Number(id)) {
    res.status(400).json({ errorMessage: "Wrong input params: id, current" });
    return;
  }

  const exercise: DbWord | null | undefined = await getQuestion(Number(id));

  if (!exercise) {
    res.status(400).json({ errorMessage: "Wrong input params: id" });
    return;
  }

  try {
    const currentHelp = current === undefined ? undefined : String(current);
    const help = getQuestionHelp(exercise, currentHelp);
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
  const exercise: DbWord | null | undefined = await getQuestion(questionId);

  if (!exercise) {
    res.status(400).json({ errorMessage: "Wrong input params: questionId" });
    return;
  }

  try {
    const audioBase64 = await getAudioBase64(exercise.es, {
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
