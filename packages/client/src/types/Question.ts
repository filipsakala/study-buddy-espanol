export enum QuestionCategory {
  TRANSLATE_WORD = "TRANSLATE_WORD",
  WORDS_MATCH = "WORDS_MATCH",
}

export enum QuestionLearnGroup {
  ANIMALS = "animals",
  NUMBERS = "numbers",
  CLOTHES = "clothes",
  FOOD = "food",
}

export type DbQuestion = {
  id: number | number[];
  icon?: string; // base64 encoded icon
  category: QuestionCategory;
  question: string | string[];
  correctAnswer: string | string[];
  learnGroup: QuestionLearnGroup | QuestionLearnGroup[];
};

export type QuizQuestion = DbQuestion & {
  index: number;
  score: number;
  answer: string | number[][];
};
