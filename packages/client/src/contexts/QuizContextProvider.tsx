import { createContext, useMemo } from "react";
import { EQuizStatus } from "../types/Quiz";
import useQuizActions from "./useQuizActions";

export type TQuizContext = {
  status: EQuizStatus;
  startQuiz: () => void;
};

export const QuizContext = createContext<TQuizContext>({
  status: EQuizStatus.INIT,
  startQuiz: () => {},
});

type TQuizContextProvider = {
  children: React.ReactNode;
};

export const QuizContextProvider = ({ children }: TQuizContextProvider) => {
  const { status, startQuiz } = useQuizActions();

  const contextValue = useMemo(
    () => ({
      status,
      startQuiz,
    }),
    [status, startQuiz]
  );

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};
