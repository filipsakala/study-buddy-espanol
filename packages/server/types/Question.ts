export type QuestionCategory = "TRANSLATE_WORD" | "WORDS_MATCH";

export type Question = {
  id: number | number[];
  icon?: string; // base64 encoded icon
  category: QuestionCategory;
  question: string | string[];
  correctAnswer: string | string[];
  learnGroup: string | string[];
};

export type DbWordQuestion = {
  id: number;
  icon: string;
  en: string;
  es: string;
  learn_group: string;
};
