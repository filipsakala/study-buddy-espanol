import { EQuizStatus } from "../types/Quiz";
import useQuizActions from "./useQuizActions";
import { QuizQuestion } from "../types/Question";
import { createContext } from "use-context-selector";

export type TQuizContext = {
  isApiLoading: boolean;
  hasApiError: boolean;
  quizStatus: EQuizStatus;
  questions: QuizQuestion[];
  currentQuestion: QuizQuestion;
  currentQuestionHelp: string[];
  currentAnswer: string | number[][];

  startQuiz: () => void;
  answerQuestion: () => void;
  getQuestionHelp: () => void;
  playAnswerAudio: (questionId: number) => void;
  setCurrentAnswer: React.Dispatch<React.SetStateAction<string | number[][]>>;
};

export const QuizContext = createContext<TQuizContext>({
  isApiLoading: false,
  hasApiError: false,
  quizStatus: EQuizStatus.INIT,
  questions: [],
  currentQuestion: {} as QuizQuestion,
  currentQuestionHelp: [],
  currentAnswer: "",

  startQuiz: () => {},
  answerQuestion: () => {},
  getQuestionHelp: () => {},
  playAnswerAudio: () => {},
  setCurrentAnswer: (() => {}) as unknown as React.Dispatch<
    React.SetStateAction<string | number[][]>
  >,
});

type TQuizContextProvider = {
  children: React.ReactNode;
};

export const QuizContextProvider = ({ children }: TQuizContextProvider) => {
  const contextValue: TQuizContext = useQuizActions();

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};
