import { createContext, useMemo } from "react";
import { EQuizStatus } from "../types/Quiz";
import useQuizActions from "./useQuizActions";

export type TQuizContext = {
  status: EQuizStatus;
  startQuiz: () => void;
  isApiLoading: boolean;
  hasApiError: boolean;
};

export const QuizContext = createContext<TQuizContext>({
  status: EQuizStatus.INIT,
  startQuiz: () => {},
  isApiLoading: false,
  hasApiError: false,
});

type TQuizContextProvider = {
  children: React.ReactNode;
};

export const QuizContextProvider = ({ children }: TQuizContextProvider) => {
  const { status, startQuiz, hasApiError, isLoading } = useQuizActions();

  const contextValue = useMemo(
    () => ({
      status,
      startQuiz,
      isApiLoading: isLoading,
      hasApiError,
    }),
    [status, startQuiz, isLoading, hasApiError]
  );

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};
