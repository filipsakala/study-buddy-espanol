import { useCallback, useState } from "react";
import apiFetch from "../api/apiFetch";
import { DbExercise, ExerciseCategory } from "../types/Question";
import { QUIZ_EXERCISE_COUNT } from "../types/Quiz";
import { Codetables } from "../types/Codetables";
import { useSnackbar } from "notistack";

const useQuizApi = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const getQuestions = useCallback(
    async (
      learnGroup?: string[],
      course?: string[]
    ): Promise<DbExercise[] | undefined> => {
      // some request already fired
      if (isLoading) {
        return;
      }

      setHasError(false);
      setIsLoading(true);
      const urlParams = new URLSearchParams();
      urlParams.append("count", String(QUIZ_EXERCISE_COUNT));

      if (learnGroup) {
        learnGroup.forEach((group) => urlParams.append("learnGroup", group));
      }
      if (course) {
        course.forEach((group) => urlParams.append("course", group));
      }

      const data = await apiFetch<DbExercise[]>(
        `/question?` + urlParams.toString()
      );
      setIsLoading(false);

      // probably some error status
      if (!data) {
        setHasError(true);
      }
      return data;
    },
    [isLoading]
  );

  const getQuestionHelp = useCallback(
    async (
      questionId: string,
      currentHelp?: string
    ): Promise<string | undefined> => {
      // some request already fired
      if (isLoading) {
        return;
      }

      setHasError(false);
      setIsLoading(true);
      const urlParams = new URLSearchParams();
      urlParams.append("id", String(questionId));
      if (currentHelp) {
        urlParams.append("current", currentHelp);
      }

      const data = await apiFetch<string>(
        `/question/help?` + urlParams.toString()
      );
      setIsLoading(false);

      // probably some error status
      if (!data) {
        setHasError(true);
      }
      return data;
    },
    [isLoading]
  );

  const answerQuestion = useCallback(
    async (
      questionId: string,
      answer: string,
      category: ExerciseCategory,
      questionParam?: string | number
    ): Promise<{ result: boolean; correctAnswer?: string } | undefined> => {
      // some request already fired
      if (isLoading) {
        return;
      }

      setHasError(false);
      setIsLoading(true);
      const data = await apiFetch<
        { result: boolean; correctAnswer?: string } | undefined
      >(`/answer`, "POST", {
        questionId,
        answer,
        category,
        questionParam,
      });
      setIsLoading(false);

      if (data === undefined) {
        setHasError(true);
      }

      if (data?.result === true) {
        enqueueSnackbar({ message: "Correct!", variant: "success" });
      } else {
        enqueueSnackbar({
          message: data?.correctAnswer ?? "That was incorrect :(",
          variant: "error",
        });
      }
      return data;
    },
    [isLoading, enqueueSnackbar]
  );

  const getAnswerSound = useCallback(
    async (questionId: string): Promise<string | undefined> => {
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

  const getCodetables = useCallback(async (): Promise<
    Codetables | undefined
  > => {
    setHasError(false);

    const data = await apiFetch<Codetables | undefined>(`/codetables`, "GET");

    if (data === undefined) {
      setHasError(true);
    }

    return data;
  }, []);

  return {
    isApiLoading: isLoading,
    hasApiError: hasError,
    getQuestionsApiCall: getQuestions,
    getQuestionHelpApiCall: getQuestionHelp,
    answerQuestionApiCall: answerQuestion,
    getAnswerSoundApiCall: getAnswerSound,
    getCodetablesApiCall: getCodetables,
  };
};

export default useQuizApi;
