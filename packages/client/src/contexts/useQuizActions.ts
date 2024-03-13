import { useCallback, useMemo, useState } from "react";
import { EQuizStatus } from "../types/Quiz";

const useQuizActions = () => {
  const [status, setStatus] = useState(EQuizStatus.INIT);

  const startQuiz = useCallback(() => {
    // load quiz questions, progress, etc... and set it to the context
    setStatus(EQuizStatus.IN_PROGRESS);
  }, []);

  return useMemo(
    () => ({
      status,
      startQuiz,
    }),
    [status, startQuiz]
  );
};

export default useQuizActions;
