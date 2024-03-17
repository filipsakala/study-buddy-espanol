export type QuestionCategory = "TRANSLATE_WORD";

export type Question = {
  icon?: string; // base64 encoded icon
  category: QuestionCategory;
  answers: string[]; // possible answers can be empty for open answer questions
  correctAnswer: string;
};

export type Answer = {
  isAnswered: boolean;
  isCorrect: boolean;
};
