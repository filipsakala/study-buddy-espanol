import { useCallback, useMemo, useState } from "react";
import { EQuizStatus } from "../types/Quiz";
import useQuizApi from "./useQuizApi";
import { AnsweredQuestion } from "../types/Question";

const useQuizActions = () => {
  const { getQuestions, answerQuestion: answerQuestionApi } = useQuizApi();
  const [status, setStatus] = useState<EQuizStatus>(EQuizStatus.INIT);
  const [questions, setQuestions] = useState<AnsweredQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasApiError, setHasApiError] = useState<boolean>(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [help, setHelp] = useState<string[]>([]);

  const startQuiz = useCallback(async () => {
    setHasApiError(false);
    setIsLoading(true);
    const apiQuestions = await getQuestions();
    setIsLoading(false);

    // probably some error status
    if (!apiQuestions) {
      setHasApiError(true);
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
    setHasApiError(false);
    if (
      status !== EQuizStatus.IN_PROGRESS ||
      !questions ||
      isLoading ||
      currentQuestionIndex > questions.length ||
      !currentAnswer
    ) {
      return;
    }

    setIsLoading(true);
    const isCorrectAnswer = await answerQuestionApi(
      questions[currentQuestionIndex].id,
      currentAnswer
    );
    setIsLoading(false);

    if (isCorrectAnswer === undefined) {
      setHasApiError(true);
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
  }, [status, questions, isLoading, currentQuestionIndex, answers]);

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
      isLoading,
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
      isLoading,
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
