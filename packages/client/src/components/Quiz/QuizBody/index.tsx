import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import QuizInitBody from "./QuizInitBody";
import QuizInProgressBody from "./QuizInProgressBody";
import QuizDoneBody from "./QuizDoneBody";
import { useContextSelector } from "use-context-selector";

const QuizBody = () => {
  const status = useContextSelector(QuizContext, (c) => c.quizStatus);

  return (
    <>
      {status === EQuizStatus.INIT && <QuizInitBody />}
      {status === EQuizStatus.IN_PROGRESS && <QuizInProgressBody />}
      {status === EQuizStatus.DONE && <QuizDoneBody />}
    </>
  );
};

export default QuizBody;
