import { useCallback, useMemo } from "react";
import apiFetch from "../api/apiFetch";
import { Question } from "../types/Question";
import { QUIZ_QUESTION_COUNT } from "../types/Quiz";

const useQuizApi = () => {
  const getQuestions = useCallback((): Promise<Question[] | undefined> => {
    return apiFetch<Question[]>(`/question?count=${QUIZ_QUESTION_COUNT}`);
  }, []);

  return useMemo(() => ({ getQuestions }), [getQuestions]);
};

export default useQuizApi;
