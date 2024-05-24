import { EQuizStatus } from "../types/Quiz";
import useQuizActions from "./useQuizActions";
import { QuizQuestion } from "../types/Question";
import { createContext } from "use-context-selector";
import { Codetables } from "../types/Codetables";

export type TQuizContext = {
  isApiLoading: boolean;
  hasApiError: boolean;
  quizStatus: EQuizStatus;
  questions: QuizQuestion[];
  currentQuestion: QuizQuestion;
  currentQuestionHelp: string[];
  currentAnswer: string | number[][];
  codetables?: Codetables;
  filter: {
    learnGroups: string[];
  };

  startQuiz: () => void;
  answerQuestion: () => void;
  getQuestionHelp: () => void;
  playAnswerAudio: (questionId: number) => void;
  setCurrentAnswer: React.Dispatch<React.SetStateAction<string | number[][]>>;
  setFilterLearnGroups: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >;
};

export const QuizContext = createContext<TQuizContext>({
  isApiLoading: false,
  hasApiError: false,
  quizStatus: EQuizStatus.INIT,
  questions: [],
  currentQuestion: {} as QuizQuestion,
  currentQuestionHelp: [],
  currentAnswer: "",
  codetables: undefined,
  filter: {
    learnGroups: [],
  },

  startQuiz: () => {},
  answerQuestion: () => {},
  getQuestionHelp: () => {},
  playAnswerAudio: () => {},
  setCurrentAnswer: (() => {}) as unknown as React.Dispatch<
    React.SetStateAction<string | number[][]>
  >,
  setFilterLearnGroups: (() => {}) as unknown as React.Dispatch<
    React.SetStateAction<string[] | undefined>
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
