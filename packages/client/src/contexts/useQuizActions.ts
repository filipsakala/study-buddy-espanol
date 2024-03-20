import { useCallback, useMemo, useState } from "react";
import { EQuizStatus } from "../types/Quiz";
import useQuizApi from "./useQuizApi";
import { AnsweredQuestion } from "../types/Question";

const useQuizActions = () => {
  const { getQuestions } = useQuizApi();
  const [status, setStatus] = useState<EQuizStatus>(EQuizStatus.INIT);
  const [questions, setQuestions] = useState<AnsweredQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasApiError, setHasApiError] = useState<boolean>(false);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");

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
    setScore([]);
    setStatus(EQuizStatus.IN_PROGRESS);
  }, []);

  const answerQuestion = useCallback(() => {
    if (
      status !== EQuizStatus.IN_PROGRESS ||
      !questions ||
      isLoading ||
      currentQuestionIndex > questions.length ||
      !currentAnswer
    ) {
      return;
    }

    // TODO: improve for different question types
    const isCorrectAnswer =
      questions[currentQuestionIndex].correctAnswer === currentAnswer;
    const questionScore = isCorrectAnswer ? 1 : -1;
    setScore((prev) => {
      const next = [...prev];
      next[currentQuestionIndex] = questionScore;
      return next;
    });
    // reset current state of answering
    setCurrentAnswer("");

    // last question
    if (currentQuestionIndex + 1 === questions.length) {
      setStatus(EQuizStatus.DONE);
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
  }, [status, questions, isLoading, currentQuestionIndex, currentAnswer]);

  return useMemo(
    () => ({
      isLoading,
      hasApiError,
      questions,
      status,
      startQuiz,
      answerQuestion,
      currentAnswer,
      setCurrentAnswer,
      currentQuestionIndex,
      score,
    }),
    [
      isLoading,
      hasApiError,
      questions,
      status,
      startQuiz,
      answerQuestion,
      currentAnswer,
      setCurrentAnswer,
      currentQuestionIndex,
      score,
    ]
  );
};

export default useQuizActions;
