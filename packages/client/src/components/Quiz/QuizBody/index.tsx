import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { styled } from "@mui/system";
import QuizInitBody from "./QuizInitBody";
import QuizInProgressBody from "./QuizInProgressBody";
import QuizDoneBody from "./QuizDoneBody";
import { useContextSelector } from "use-context-selector";

const StyledWrapper = styled("div")`
  display: flex;
  gap: 5px;

  align-items: center;
  justify-content: center;
  padding: 15px;
`;

const QuizBody = () => {
  const status = useContextSelector(QuizContext, (c) => c.quizStatus);

  return (
    <StyledWrapper>
      {status === EQuizStatus.INIT && <QuizInitBody />}
      {status === EQuizStatus.IN_PROGRESS && <QuizInProgressBody />}
      {status === EQuizStatus.DONE && <QuizDoneBody />}
    </StyledWrapper>
  );
};

export default QuizBody;
