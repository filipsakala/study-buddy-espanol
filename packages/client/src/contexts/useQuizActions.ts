import { useCallback, useMemo, useState } from "react";
import { EQuizStatus } from "../types/Quiz";
import useQuizApi from "./useQuizApi";
import { Question } from "../types/Question";
import useHelp from "./useHelp";

const useQuizActions = () => {
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
  const [answers, setAnswers] = useState<string[]>([]);

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex]
  );
  const currentAnswer = useMemo(
    () => answers[currentQuestionIndex] || "",
    [currentQuestionIndex, answers]
  );

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

  const answerQuestion = useCallback(async () => {
    if (status !== EQuizStatus.IN_PROGRESS || !currentAnswer) {
      return;
    }

    const isCorrectAnswer = await answerQuestionApiCall(
      currentQuestion.id,
      currentAnswer
    );

    if (isCorrectAnswer === undefined) {
      return;
    }

    setCurrentQuestionScore(isCorrectAnswer, Boolean(help.length));
    goToNextQuestion();
    resetHelp();
  }, [
    status,
    currentQuestion,
    currentAnswer,
    goToNextQuestion,
    help,
    resetHelp,
  ]);

  const setCurrentAnswer = useCallback(
    (answer: string) => {
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
