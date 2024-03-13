import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { styled } from "@mui/system";
import QuizInitBody from "./QuizInitBody";

const StyledWrapper = styled("div")`
  display: flex;
  gap: 5px;

  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;

const QuizBody = () => {
  const { status } = useContext(QuizContext);

  return (
    <StyledWrapper>
      {status === EQuizStatus.INIT && <QuizInitBody />}
    </StyledWrapper>
  );
};

export default QuizBody;
