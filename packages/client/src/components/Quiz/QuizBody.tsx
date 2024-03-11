import { useContext } from "react";
import { QuizContext } from "../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../types/Quiz";

const QuizBody = () => {
  const { status } = useContext(QuizContext);

  if (status === EQuizStatus.INIT) {
    return <div>INIT QuizBody</div>;
  }

  return <div></div>;
};

export default QuizBody;
