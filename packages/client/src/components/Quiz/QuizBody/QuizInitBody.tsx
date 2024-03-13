import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";

const QuizInitBody = () => {
  const { status } = useContext(QuizContext);

  if (status !== EQuizStatus.INIT) {
    return null;
  }

  return <>Init body</>;
};

export default QuizInitBody;
