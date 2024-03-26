import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { styled } from "@mui/system";
import QuizInProgressStatus from "./QuizInProgressStatus";

const StyledWrapper = styled("div")`
  display: flex;
  gap: 5px;

  align-items: center;
  padding: 10px;

  border-bottom: 1px solid gray;
`;

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
