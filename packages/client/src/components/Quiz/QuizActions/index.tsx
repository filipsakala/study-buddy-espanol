import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import QuizInitDoneActions from "./QuizInitDoneActions";
import { styled } from "@mui/material";
import QuizInProgressActions from "./QuizInProgressActions";

const StyledWrapper = styled("div")`
  display: flex;
  gap: 5px;

  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 10px 0;

  border-top: 1px solid gray;
`;

const QuizActions = () => {
  const { status } = useContext(QuizContext);

  return (
    <StyledWrapper>
      {(status === EQuizStatus.INIT || status === EQuizStatus.DONE) && (
        <QuizInitDoneActions />
      )}
      {status === EQuizStatus.IN_PROGRESS && <QuizInProgressActions />}
    </StyledWrapper>
  );
};

export default QuizActions;
