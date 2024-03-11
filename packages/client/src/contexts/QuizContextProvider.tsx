import { createContext, useMemo } from "react";
import { EQuizStatus } from "../types/Quiz";

export type TQuizContext = {
  status: EQuizStatus;
};

export const QuizContext = createContext<TQuizContext>({
  status: EQuizStatus.INIT,
});

type TQuizContextProvider = {
  children: React.ReactNode;
};

export const QuizContextProvider = ({ children }: TQuizContextProvider) => {
  const contextValue = useMemo(
    () => ({
      status: EQuizStatus.INIT,
    }),
    []
  );

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};
