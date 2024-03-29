import { createContext, useMemo } from "react";
import { EQuizStatus } from "../types/Quiz";
import useQuizActions from "./useQuizActions";
import { AnsweredQuestion } from "../types/Question";

export type TQuizContext = {
  status: EQuizStatus;
  startQuiz: () => void;
  answerQuestion: () => void;
  getQuestionHelp: () => void;
  currentAnswer: string;
  answers: string[];
  setCurrentAnswer: (answer: string) => void;
  isApiLoading: boolean;
  hasApiError: boolean;
  questions: AnsweredQuestion[];
  currentQuestionIndex: number;
  score: number[];
  help: string[];
};

export const QuizContext = createContext<TQuizContext>({
  status: EQuizStatus.INIT,
  startQuiz: () => {},
  answerQuestion: () => {},
  getQuestionHelp: () => {},
  currentAnswer: "",
  answers: [],
  setCurrentAnswer: () => {},
  isApiLoading: false,
  hasApiError: false,
  questions: [],
  currentQuestionIndex: 0,
  score: [],
  help: [],
});

type TQuizContextProvider = {
  children: React.ReactNode;
};

export const QuizContextProvider = ({ children }: TQuizContextProvider) => {
  const {
    status,
    startQuiz,
    answerQuestion,
    getQuestionHelp,
    currentAnswer,
    answers,
    setCurrentAnswer,
    isLoading,
    hasApiError,
    questions,
    currentQuestionIndex,
    score,
    help,
  } = useQuizActions();

  const contextValue = useMemo(
    () => ({
      status,
      startQuiz,
      answerQuestion,
      getQuestionHelp,
      currentAnswer,
      answers,
      setCurrentAnswer,
      isApiLoading: isLoading,
      hasApiError,
      questions,
      currentQuestionIndex,
      score,
      help,
    }),
    [
      status,
      startQuiz,
      answerQuestion,
      currentAnswer,
      answers,
      setCurrentAnswer,
      isLoading,
      hasApiError,
      questions,
      currentQuestionIndex,
      score,
      help,
    ]
  );

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};
