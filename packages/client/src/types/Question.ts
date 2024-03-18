export enum QuestionCategory {
  TRANSLATE_WORD = "TRANSLATE_WORD",
}

export type Question = {
  icon?: string; // base64 encoded icon
  category: QuestionCategory;
  question: string;
  answers: string[]; // possible answers can be empty for open answer questions
  correctAnswer: string;
};

export type Answer = {
  isAnswered: boolean;
  isCorrect: boolean;
};

export type AnsweredQuestion = Question | (Question & Answer);
