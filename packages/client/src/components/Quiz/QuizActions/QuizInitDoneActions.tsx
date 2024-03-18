import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { Button } from "@mui/material";
import { HourglassTop } from "@mui/icons-material";

const QuizInitDoneActions = () => {
  const { status, startQuiz, isApiLoading } = useContext(QuizContext);

  if (status !== EQuizStatus.INIT && status !== EQuizStatus.DONE) {
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
