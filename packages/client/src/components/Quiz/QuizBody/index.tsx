import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { styled } from "@mui/system";
import QuizInitBody from "./QuizInitBody";
import QuizInProgressBody from "./QuizInProgressBody";
import QuizDoneBody from "./QuizDoneBody";

const StyledWrapper = styled("div")`
  display: flex;
  gap: 5px;

  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const QuizBody = () => {
  const { status } = useContext(QuizContext);

  return (
    <StyledWrapper>
      {status === EQuizStatus.INIT && <QuizInitBody />}
      {status === EQuizStatus.IN_PROGRESS && <QuizInProgressBody />}
      {status === EQuizStatus.DONE && <QuizDoneBody />}
    </StyledWrapper>
  );
};

export default QuizBody;
