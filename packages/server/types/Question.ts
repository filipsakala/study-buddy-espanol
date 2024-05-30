export type QuestionCategory = "TRANSLATE_WORD" | "WORDS_MATCH" | "ARTICLES";

export type Question = {
  id: number | number[];
  icon?: string; // base64 encoded icon
  category: QuestionCategory;
  question: string | string[];
  correctAnswer: string | string[];
  learnGroup: string | string[];
  gender?: "M" | "F";
  isSingular?: boolean;
};

export type DbWordQuestion = {
  id: number;
  icon: string;
  en: string;
  es: string;
  learn_group: string;
  gender?: "M" | "F";
  is_singular?: boolean;
};
