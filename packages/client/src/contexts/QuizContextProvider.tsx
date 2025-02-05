import { EQuizStatus } from "../types/Quiz";
import useQuizActions from "./useQuizActions";
import { QuizExercise } from "../types/Question";
import { createContext } from "use-context-selector";
import { Codetables } from "../types/Codetables";

export type TQuizContext = {
  isApiLoading: boolean;
  hasApiError: boolean;
  quizStatus: EQuizStatus;
  exercises: QuizExercise[];
  currentExercise: QuizExercise;
  currentQuestionHelp: string;
  currentAnswer: string[];
  codetables?: Codetables;
  filter: {
    courses: string[];
    learnGroups: string[];
  };

  startQuiz: () => void;
  answerQuestion: (
    questionId: string,
    answer: string,
    questionIndex?: number,
    questionParam?: string | number
  ) => Promise<{ result: boolean; correctAnswer?: string } | undefined>;
  getQuestionHelp: () => void;
  playAnswerAudio: (questionId: string) => void;
  setCurrentAnswer: React.Dispatch<React.SetStateAction<string[]>>;
  setFilterLearnGroups: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >;
  setFilterCourses: React.Dispatch<React.SetStateAction<string[] | undefined>>;
};

export const QuizContext = createContext<TQuizContext>({
  isApiLoading: false,
  hasApiError: false,
  quizStatus: EQuizStatus.INIT,
  exercises: [],
  currentExercise: {} as QuizExercise,
  currentQuestionHelp: "",
  currentAnswer: [],
  codetables: undefined,
  filter: {
    courses: ["A2"],
    learnGroups: [],
  },

  startQuiz: () => {},
  answerQuestion: () => Promise.resolve({ result: false }),
  getQuestionHelp: () => {},
  playAnswerAudio: () => {},
  setCurrentAnswer: (() => {}) as unknown as React.Dispatch<
    React.SetStateAction<string[]>
  >,
  setFilterLearnGroups: (() => {}) as unknown as React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >,
  setFilterCourses: (() => {}) as unknown as React.Dispatch<
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
