import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";

const QuizInitStatus = () => {
  const { status } = useContext(QuizContext);

  if (status !== EQuizStatus.INIT) {
    return null;
  }

  return <>Init status</>;
};

export default QuizInitStatus;
