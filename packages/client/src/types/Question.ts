export enum QuestionCategory {
  TRANSLATE_WORD = "TRANSLATE_WORD",
  WORDS_MATCH = "WORDS_MATCH",
  ARTICLES = "ARTICLES",
}

type Question = {
  id: number;
  icon?: string;
  textEn: string;
  textEs?: string; // available only for some categories
  randomizedAnswer?: string; // available only for some categories
  learnGroup: string;
  gender?: "M" | "F"; // available only for some categories
  isSingular?: boolean; // available only for some categories
};

export type DbQuestion = {
  category: QuestionCategory;
  questions: Question[];
};

export type QuizQuestion = Omit<DbQuestion, "questions"> & {
  index: number;
  questions: (Question & {
    correctAnswer: string;
    yourAnswer: string;
    score: number;
  })[];
};
