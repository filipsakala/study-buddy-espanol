export enum QuestionCategory {
  TRANSLATE_WORD = "TRANSLATE_WORD",
  WORDS_MATCH = "WORDS_MATCH",
  ARTICLES = "ARTICLES",
}

export type DbQuestion = {
  id: number | number[];
  icon?: string | string[]; // base64 encoded icon
  category: QuestionCategory;
  question: string | string[];
  correctAnswer: string | string[];
  learnGroup: string | string[];
  gender?: ("M" | "F") | ("M" | "F")[];
  isSingular?: boolean | boolean[];
};

export type QuizQuestion = DbQuestion & {
  index: number;
  score: number;
  answer: string | number[][] | string[];
};
