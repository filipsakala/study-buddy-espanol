import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { Button } from "@mui/material";

const QuizInitActions = () => {
  const { status, startQuiz } = useContext(QuizContext);

  if (status !== EQuizStatus.INIT) {
    return null;
  }

  return (
    <>
      <Button variant="contained" color="success" onClick={startQuiz}>
        Start Quiz
      </Button>
    </>
  );
};

export default QuizInitActions;
