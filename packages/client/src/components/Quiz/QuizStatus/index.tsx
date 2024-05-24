import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { styled } from "@mui/material";
import QuizInProgressStatus from "./QuizInProgressStatus";
import { useContextSelector } from "use-context-selector";

const StyledWrapper = styled("div")(
  ({ theme }) => `
      display: flex;
      gap: 5px;

      align-items: center;
      padding: 10px;

      border-bottom: 1px solid ${theme.palette.divider};
`
);

const QuizStatus = () => {
  const status = useContextSelector(QuizContext, (c) => c.quizStatus);

  if (status === EQuizStatus.INIT || status === EQuizStatus.DONE) {
    return;
  }

  return <QuizInProgressStatus />;
};

export default QuizStatus;
