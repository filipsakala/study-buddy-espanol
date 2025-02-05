export enum ExerciseCategory {
  TRANSLATE_WORD = "TRANSLATE_WORD",
  WORDS_MATCH = "WORDS_MATCH",
  ARTICLES = "ARTICLES",
  PRETERITO_PERFECTO = "PRETERITO_PERFECTO",
  PRETERITO_INDEFINIDO = "PRETERITO_INDEFINIDO",
}

type Question = {
  id: string;
  icon?: string;
  textEn?: string;
  textEs?: string; // available only for some categories
  randomizedAnswer?: string; // available only for some categories
  learnGroup?: string;
  gender?: "M" | "F"; // available only for some categories
  isSingular?: boolean; // available only for some categories
};

export type DbExercise = {
  category: ExerciseCategory;
  questions: Question[];
};

export type QuizExercise = Omit<DbExercise, "questions"> & {
  index: number;
  questions: (Question & {
    correctAnswer: string;
    yourAnswer: string;
    score: number;
  })[];
};
