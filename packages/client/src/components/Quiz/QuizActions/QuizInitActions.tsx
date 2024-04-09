import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { Button } from "@mui/material";
import { HourglassTop } from "@mui/icons-material";
import { useContextSelector } from "use-context-selector";

const QuizInitDoneActions = () => {
  const status = useContextSelector(QuizContext, (c) => c.status);
  const startQuiz = useContextSelector(QuizContext, (c) => c.startQuiz);
  const isApiLoading = useContextSelector(QuizContext, (c) => c.isApiLoading);

  if (status !== EQuizStatus.INIT) {
    return null;
  }

  return (
    <Button
      variant="contained"
      color="success"
      disabled={isApiLoading}
      onClick={startQuiz}
    >
      Start Quiz {isApiLoading && <HourglassTop />}
    </Button>
  );
};

export default QuizInitDoneActions;
