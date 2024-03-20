export type QuestionCategory = "TRANSLATE_WORD";
export type QuestionLearnGroup = "animals" | "numbers" | "clothes" | "food";

export type Question = {
  icon?: string; // base64 encoded icon
  category: QuestionCategory;
  question: string;
  answers: string[]; // possible answers can be empty for open answer questions
  correctAnswer: string;
  learnGroup: QuestionLearnGroup;
};
