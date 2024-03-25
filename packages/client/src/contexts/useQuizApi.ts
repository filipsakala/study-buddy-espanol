import { useCallback, useMemo } from "react";
import apiFetch from "../api/apiFetch";
import { Question } from "../types/Question";
import { QUIZ_QUESTION_COUNT } from "../types/Quiz";

const useQuizApi = () => {
  const getQuestions = useCallback((): Promise<Question[] | undefined> => {
    return apiFetch<Question[]>(`/question?count=${QUIZ_QUESTION_COUNT}`);
  }, []);

  const answerQuestion = useCallback(
    (questionId: string, answer: string): Promise<boolean | undefined> => {
      return apiFetch<boolean | undefined>(`/answer`, "POST", {
        questionId,
        answer,
      });
    },
    []
  );

  return useMemo(
    () => ({ getQuestions, answerQuestion }),
    [getQuestions, answerQuestion]
  );
};

export default useQuizApi;
