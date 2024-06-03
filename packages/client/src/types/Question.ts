export enum QuestionCategory {
  TRANSLATE_WORD = "TRANSLATE_WORD",
  WORDS_MATCH = "WORDS_MATCH",
  ARTICLES = "ARTICLES",
}

export type DbQuestion = {
  category: QuestionCategory;
  questions: {
    id: number;
    icon?: string;
    textEn: string;
    textEs?: string; // available only for some categories
    randomizedAnswer?: string; // available only for some categories
    learnGroup: string;
    gender?: "M" | "F"; // available only for some categories
    isSingular?: boolean; // available only for some categories
  }[];
};

export type QuizQuestion = DbQuestion & {
  index: number;
  score: number;
};
