import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { Button } from "@mui/material";

const QuizInProgressActions = () => {
  const { status, answerQuestion } = useContext(QuizContext);

  if (status !== EQuizStatus.IN_PROGRESS) {
    return null;
  }

  return (
    <Button variant="contained" color="success" onClick={answerQuestion}>
      Submit answer
    </Button>
  );
};

export default QuizInProgressActions;
