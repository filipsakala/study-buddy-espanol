export enum QuestionCategory {
  TRANSLATE_WORD = "TRANSLATE_WORD",
}

export enum QuestionLearnGroup {
  ANIMALS = "animals",
  NUMBERS = "numbers",
  CLOTHES = "clothes",
  FOOD = "food",
}

export type Question = {
  id: string;
  icon?: string; // base64 encoded icon
  category: QuestionCategory;
  question: string;
  answers: string[]; // possible answers can be empty for open answer questions
  correctAnswer: string;
  learnGroup: QuestionLearnGroup;
};

export type Answer = {
  isAnswered: boolean;
  isCorrect: boolean;
};

export type AnsweredQuestion = Question | (Question & Answer);
