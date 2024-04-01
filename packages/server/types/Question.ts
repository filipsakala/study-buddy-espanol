export type QuestionCategory = "TRANSLATE_WORD" | "WORDS_MATCH";
export type QuestionLearnGroup = "animals" | "numbers" | "clothes" | "food";

export type Question = {
  id: number | number[];
  icon?: string; // base64 encoded icon
  category: QuestionCategory;
  question: string | string[];
  correctAnswer: string | string[];
  learnGroup: QuestionLearnGroup | QuestionLearnGroup[];
};

export type DbWordQuestion = {
  id: number;
  icon: string;
  en: string;
  es: string;
  learn_group: QuestionLearnGroup;
};
