import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { styled } from "@mui/system";
import QuizInitStatus from "./QuizInitStatus";

const StyledWrapper = styled("div")`
  display: flex;
  gap: 5px;

  width: 100%;
  align-items: center;
  padding: 10px 0;

  border-bottom: 1px solid gray;
`;

const QuizStatus = () => {
  const { status } = useContext(QuizContext);

  return (
    <StyledWrapper>
      {status === EQuizStatus.INIT && <QuizInitStatus />}
    </StyledWrapper>
  );
};

export default QuizStatus;
