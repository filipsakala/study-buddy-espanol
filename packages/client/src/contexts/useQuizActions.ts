import { useCallback, useMemo, useState } from "react";
import { EQuizStatus } from "../types/Quiz";
import useQuizApi from "./useQuizApi";
import { AnsweredQuestion } from "../types/Question";

const useQuizActions = () => {
  const {
    isApiLoading,
    hasApiError,
    getQuestionsApiCall,
    answerQuestionApiCall,
  } = useQuizApi();
  const [status, setStatus] = useState<EQuizStatus>(EQuizStatus.INIT);
  const [questions, setQuestions] = useState<AnsweredQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [help, setHelp] = useState<string[]>([]);

  const startQuiz = useCallback(async () => {
    const apiQuestions = await getQuestionsApiCall();

    if (!apiQuestions) {
      return;
    }

    setQuestions(apiQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore([]);
    setStatus(EQuizStatus.IN_PROGRESS);
    setHelp([]);
  }, []);

  const answerQuestion = useCallback(async () => {
    const currentAnswer = answers[currentQuestionIndex];
    if (
      status !== EQuizStatus.IN_PROGRESS ||
      !questions ||
      currentQuestionIndex > questions.length ||
      !currentAnswer
    ) {
      return;
    }

    const isCorrectAnswer = await answerQuestionApiCall(
      questions[currentQuestionIndex].id,
      currentAnswer
    );

    if (isCorrectAnswer === undefined) {
      return;
    }

    const hasHelp = Boolean(help.length);
    const questionScore = isCorrectAnswer ? (hasHelp ? 1 : 2) : -1;
    setScore((prev) => {
      const next = [...prev];
      next[currentQuestionIndex] = questionScore;
      return next;
    });

    // last question
    if (currentQuestionIndex + 1 === questions.length) {
      setStatus(EQuizStatus.DONE);
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setHelp([]);
  }, [status, questions, currentQuestionIndex, answers]);

  const getQuestionHelp = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];

    // just show number of letters
    if (!help.length) {
      setHelp(
        [...Array(currentQuestion.correctAnswer.length)].map((_, i) => {
          // duplicate spaces between words
          if (currentQuestion.correctAnswer[i] === " ") {
            return " ";
          }
          return "";
        })
      );
      return;
    }

    const emptyIndexes = help.reduce(
      (prevIndexes: number[], currentHelp, currentIndex) => {
        const nextIndexes = [...prevIndexes];

        if (!currentHelp) {
          nextIndexes.push(currentIndex);
        }

        return nextIndexes;
      },
      []
    );

    if (!emptyIndexes.length) {
      return;
    }

    const randomIndexInRange = Math.floor(Math.random() * emptyIndexes.length);
    const randomEmptyIndex = emptyIndexes[randomIndexInRange];

    setHelp((prev) => {
      const next = [...prev];
      next[randomEmptyIndex] = currentQuestion.correctAnswer[randomEmptyIndex];
      return next;
    });
  }, [help, questions, currentQuestionIndex]);

  const currentAnswer = useMemo(
    () => answers[currentQuestionIndex] || "",
    [currentQuestionIndex, answers]
  );

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
    ]
  );
};

export default useQuizActions;
