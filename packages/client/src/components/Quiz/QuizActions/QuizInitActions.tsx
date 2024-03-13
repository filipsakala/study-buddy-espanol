import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { Button } from "@mui/material";

const QuizInitActions = () => {
  const { status } = useContext(QuizContext);

  if (status !== EQuizStatus.INIT) {
    return null;
  }

  return (
    <>
      <Button variant="contained" color="success">
        Start Quiz
      </Button>
    </>
  );
};

export default QuizInitActions;
