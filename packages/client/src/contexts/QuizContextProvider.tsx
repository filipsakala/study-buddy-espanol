import { EQuizStatus } from "../types/Quiz";
import useQuizActions from "./useQuizActions";
import { Question } from "../types/Question";
import { createContext } from "use-context-selector";

export type TQuizContext = {
  status: EQuizStatus;
  startQuiz: () => void;
  answerQuestion: () => void;
  getQuestionHelp: () => void;
  currentQuestion: Question | null;
  currentAnswer: string | number[][];
  answers: (string | number[][])[];
  setCurrentAnswer: (answer: string | number[][]) => void;
  isApiLoading: boolean;
  hasApiError: boolean;
  questions: Question[];
  currentQuestionIndex: number;
  score: number[];
  help: string[];
  playAnswerAudio: (questionId: number) => void;
};

export const QuizContext = createContext<TQuizContext>({
  status: EQuizStatus.INIT,
  startQuiz: () => {},
  answerQuestion: () => {},
  getQuestionHelp: () => {},
  currentQuestion: null,
  currentAnswer: "",
  answers: [],
  setCurrentAnswer: () => {},
  isApiLoading: false,
  hasApiError: false,
  questions: [],
  currentQuestionIndex: 0,
  score: [],
  help: [],
  playAnswerAudio: () => {},
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
