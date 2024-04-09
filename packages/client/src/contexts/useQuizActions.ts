import { useCallback, useMemo, useState } from "react";
import { EQuizStatus } from "../types/Quiz";
import useQuizApi from "./useQuizApi";
import { Question, QuestionCategory } from "../types/Question";
import useHelp from "./useHelp";
import { TQuizContext } from "./QuizContextProvider";

const useQuizActions = (): TQuizContext => {
  const {
    isApiLoading,
    hasApiError,
    getQuestionsApiCall,
    answerQuestionApiCall,
    getAnswerSoundApiCall,
  } = useQuizApi();
  const [status, setStatus] = useState<EQuizStatus>(EQuizStatus.INIT);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number[]>([]);
  const [answers, setAnswers] = useState<(string | number[][])[]>([]);

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex]
  );
  const currentAnswer = useMemo(() => {
    if (!currentQuestion) {
      return "";
    }
    const defaultValue =
      currentQuestion.category === QuestionCategory.TRANSLATE_WORD ? "" : [];

    return answers[currentQuestionIndex] || defaultValue;
  }, [currentQuestionIndex, answers, currentQuestion]);

  const setCurrentQuestionScore = useCallback(
    (isCorrectAnswer: boolean, withHelp: boolean) => {
      const questionScore = isCorrectAnswer ? (withHelp ? 1 : 2) : -1;
      setScore((prev) => {
        const next = [...prev];
        next[currentQuestionIndex] = questionScore;
        return next;
      });
    },
    [currentQuestionIndex]
  );

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex + 1 >= questions.length) {
      setStatus(EQuizStatus.DONE);
    }
    setCurrentQuestionIndex((prev) => prev + 1);
  }, [currentQuestionIndex, questions]);

  const { resetHelp, help, getQuestionHelp } = useHelp(
    currentQuestion,
    setCurrentQuestionScore,
    goToNextQuestion
  );

  const startQuiz = useCallback(async () => {
    const apiQuestions = await getQuestionsApiCall();

    if (!apiQuestions) {
      return;
    }

    setQuestions(apiQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore([]);
    resetHelp();
    setStatus(EQuizStatus.IN_PROGRESS);
  }, []);

  const answerTranslateWordQuestion = useCallback(async () => {
    const isCorrectAnswer = await answerQuestionApiCall(
      currentQuestion.id as number,
      currentAnswer as string
    );

    if (isCorrectAnswer === undefined) {
      return;
    }

    setCurrentQuestionScore(isCorrectAnswer, Boolean(help.length));
    goToNextQuestion();
    resetHelp();
  }, [
    currentQuestion,
    currentAnswer,
    goToNextQuestion,
    help,
    resetHelp,
    setCurrentQuestionScore,
  ]);

  const answerWordMatchQuestion = useCallback(() => {
    const wordCount = currentQuestion.question.length;
    const correctMatches = (currentAnswer as number[][]).reduce(
      (prev, answer) => {
        if (answer[0] === answer[1]) {
          return prev + 1;
        }
        return prev;
      },
      0
    );

    const isCorrect = wordCount === currentAnswer.length; // only correct matches
    // all matches completed
    if (wordCount === correctMatches) {
      setCurrentQuestionScore(isCorrect, false);
      goToNextQuestion();
    }
  }, [
    currentQuestion,
    currentAnswer,
    goToNextQuestion,
    setCurrentQuestionScore,
  ]);

  const answerQuestion = useCallback(() => {
    if (status !== EQuizStatus.IN_PROGRESS || !currentAnswer) {
      return;
    }

    if (currentQuestion.category === QuestionCategory.TRANSLATE_WORD) {
      return answerTranslateWordQuestion();
    }

    answerWordMatchQuestion();
  }, [
    status,
    currentQuestion,
    currentAnswer,
    answerTranslateWordQuestion,
    answerWordMatchQuestion,
  ]);

  const setCurrentAnswer = useCallback(
    (answer: string | number[][]) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[currentQuestionIndex] = answer;
        return next;
      });
    },
    [currentQuestionIndex]
  );

  const playAnswerAudio = useCallback(
    async (questionId: number) => {
      const audioBase64 = await getAnswerSoundApiCall(questionId);

      let audio = new Audio("data:audio/wav;base64," + audioBase64);
      audio.play();
    },
    [getAnswerSoundApiCall]
  );

  return useMemo(
    () => ({
      isApiLoading,
      hasApiError,
      questions,
      status,
      startQuiz,
      answerQuestion,
      getQuestionHelp,
      currentQuestion,
      currentAnswer,
      answers,
      setCurrentAnswer,
      currentQuestionIndex,
      score,
      help,
      playAnswerAudio,
    }),
    [
      isApiLoading,
      hasApiError,
      questions,
      status,
      startQuiz,
      answerQuestion,
      getQuestionHelp,
      currentQuestion,
      currentAnswer,
      answers,
      setCurrentAnswer,
      currentQuestionIndex,
      score,
      help,
      playAnswerAudio,
    ]
  );
};

export default useQuizActions;
