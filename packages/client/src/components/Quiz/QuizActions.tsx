import { useContext } from "react";
import { QuizContext } from "../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../types/Quiz";

const QuizActions = () => {
  const { status } = useContext(QuizContext);

  if (status === EQuizStatus.INIT) {
    return "INIT QuizActions";
  }

  return null;
};

export default QuizActions;
