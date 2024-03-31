import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { styled } from "@mui/material";
import QuizInProgressStatus from "./QuizInProgressStatus";

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
  const { status } = useContext(QuizContext);

  if (status === EQuizStatus.INIT || status === EQuizStatus.DONE) {
    return;
  }

  return (
    <StyledWrapper>
      <QuizInProgressStatus />
    </StyledWrapper>
  );
};

export default QuizStatus;
