import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import QuizInProgressStatus from "./QuizInProgressStatus";
import { useContextSelector } from "use-context-selector";

const QuizStatus = () => {
  const status = useContextSelector(QuizContext, (c) => c.quizStatus);

  if (status === EQuizStatus.INIT || status === EQuizStatus.DONE) {
    return;
  }

  return <QuizInProgressStatus />;
};

export default QuizStatus;
