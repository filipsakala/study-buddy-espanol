import { useContext } from "react";
import { QuizContext } from "../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../types/Quiz";

const QuizStatus = () => {
  const { status } = useContext(QuizContext);

  if (status === EQuizStatus.INIT) {
    return <div>INIT QuizStatus</div>;
  }

  return <></>;
};

export default QuizStatus;
