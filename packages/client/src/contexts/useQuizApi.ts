import { useCallback, useState } from "react";
import apiFetch from "../api/apiFetch";
import { DbQuestion } from "../types/Question";
import { QUIZ_QUESTION_COUNT } from "../types/Quiz";

const useQuizApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const getQuestions = useCallback(async (): Promise<
    DbQuestion[] | undefined
  > => {
    // some request already fired
    if (isLoading) {
      return;
    }

    setHasError(false);
    setIsLoading(true);
    const data = await apiFetch<DbQuestion[]>(
      `/question?count=${QUIZ_QUESTION_COUNT}`
    );
    setIsLoading(false);

    // probably some error status
    if (!data) {
      setHasError(true);
    }
    return data;
  }, [isLoading]);

  const answerQuestion = useCallback(
    async (
      questionId: number,
      answer: string
    ): Promise<boolean | undefined> => {
      // some request already fired
      if (isLoading) {
        return;
      }

      setHasError(false);
      setIsLoading(true);
      const data = await apiFetch<boolean | undefined>(`/answer`, "POST", {
        questionId,
        answer,
      });
      setIsLoading(false);

      if (data === undefined) {
        setHasError(true);
      }

      return data;
    },
    [isLoading]
  );

  const getAnswerSound = useCallback(
    async (questionId: number): Promise<string | undefined> => {
      // some request already fired
      if (isLoading) {
        return;
      }

      setHasError(false);
      setIsLoading(true);
      const data = await apiFetch<string | undefined>(
        `/question/sound`,
        "POST",
        {
          questionId,
        }
      );
      setIsLoading(false);

      if (data === undefined) {
        setHasError(true);
      }

      return data;
    },
    [isLoading]
  );

  return {
    isApiLoading: isLoading,
    hasApiError: hasError,
    getQuestionsApiCall: getQuestions,
    answerQuestionApiCall: answerQuestion,
    getAnswerSoundApiCall: getAnswerSound,
  };
};

export default useQuizApi;
