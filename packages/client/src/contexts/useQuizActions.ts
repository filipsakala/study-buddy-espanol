import { useCallback, useMemo, useState } from "react";
import { EQuizStatus } from "../types/Quiz";
import useQuizApi from "./useQuizApi";
import { Answer, Question } from "../types/Question";

type AnsweredQuestions = Question | (Question & Answer);

const useQuizActions = () => {
  const { getQuestions } = useQuizApi();
  const [status, setStatus] = useState<EQuizStatus>(EQuizStatus.INIT);
  const [questions, setQuestions] = useState<AnsweredQuestions[] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasApiError, setHasApiError] = useState<boolean>(false);

  const startQuiz = useCallback(async () => {
    setHasApiError(false);
    setIsLoading(true);
    const apiQuestions = await getQuestions();
    setIsLoading(false);

    // probably some error status
    if (!apiQuestions) {
      setHasApiError(true);
      return;
    }

    setQuestions(apiQuestions);
    setStatus(EQuizStatus.IN_PROGRESS);
  }, []);

  return useMemo(
    () => ({ isLoading, hasApiError, questions, status, startQuiz }),
    [isLoading, hasApiError, questions, status, startQuiz]
  );
};

export default useQuizActions;
