import { createContext, useMemo } from "react";
import { EQuizStatus } from "../types/Quiz";
import useQuizActions from "./useQuizActions";
import { AnsweredQuestion } from "../types/Question";

export type TQuizContext = {
  status: EQuizStatus;
  startQuiz: () => void;
  answerQuestion: () => void;
  currentAnswer: string;
  setCurrentAnswer: (answer: string) => void;
  isApiLoading: boolean;
  hasApiError: boolean;
  questions: AnsweredQuestion[];
  currentQuestionIndex: number;
  score: number[];
};

export const QuizContext = createContext<TQuizContext>({
  status: EQuizStatus.INIT,
  startQuiz: () => {},
  answerQuestion: () => {},
  currentAnswer: "",
  setCurrentAnswer: () => {},
  isApiLoading: false,
  hasApiError: false,
  questions: [],
  currentQuestionIndex: 0,
  score: [],
});

type TQuizContextProvider = {
  children: React.ReactNode;
};

export const QuizContextProvider = ({ children }: TQuizContextProvider) => {
  const {
    status,
    startQuiz,
    answerQuestion,
    currentAnswer,
    setCurrentAnswer,
    isLoading,
    hasApiError,
    questions,
    currentQuestionIndex,
    score,
  } = useQuizActions();

  const contextValue = useMemo(
    () => ({
      status,
      startQuiz,
      answerQuestion,
      currentAnswer,
      setCurrentAnswer,
      isApiLoading: isLoading,
      hasApiError,
      questions,
      currentQuestionIndex,
      score,
    }),
    [
      status,
      startQuiz,
      answerQuestion,
      currentAnswer,
      setCurrentAnswer,
      isLoading,
      hasApiError,
      questions,
      currentQuestionIndex,
      score,
    ]
  );

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};
