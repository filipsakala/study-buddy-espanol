export type ExerciseCategory =
  | "TRANSLATE_WORD"
  | "WORDS_MATCH"
  | "ARTICLES"
  | "PRETERITO_PERFECTO"
  | "PRETERITO_INDEFINIDO";

export type Exercise = {
  category: ExerciseCategory;
  questions: {
    id: string;
    icon?: string;
    textEn?: string;
    textEs?: string; // available only for some categories
    randomizedAnswer?: string; // available only for some categories
    learnGroup?: string;
    gender?: "M" | "F"; // available only for some categories
    isSingular?: boolean; // available only for some categories
  }[];
};

export type DbWord = {
  id: string;
  icon: string;
  en: string;
  es: string;
  learn_group: string;
  gender?: "M" | "F";
  is_singular?: boolean;
};

export type DbVerb = {
  id: string;
  infinitivo: string;
  participio: string;
  preterito_indefinido_1: string;
  preterito_indefinido_2: string;
  preterito_indefinido_3: string;
  preterito_indefinido_4: string;
  preterito_indefinido_5: string;
  preterito_indefinido_6: string;
};

export const isDbWord = (question: DbWord | DbVerb): question is DbWord =>
  question.id.startsWith("WRD");
export const isDbVerb = (question: DbWord | DbVerb): question is DbVerb =>
  question.id.startsWith("ADV");
