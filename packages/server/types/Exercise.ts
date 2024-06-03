export type ExerciseCategory = "TRANSLATE_WORD" | "WORDS_MATCH" | "ARTICLES";

export type Exercise = {
  category: ExerciseCategory;
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

export type DbWord = {
  id: number;
  icon: string;
  en: string;
  es: string;
  learn_group: string;
  gender?: "M" | "F";
  is_singular?: boolean;
};
