import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import QuizInitActions from "./QuizInitActions";
import { styled } from "@mui/material";

const StyledWrapper = styled("div")`
  display: flex;
  gap: 5px;

  width: 100%;
  position: absolute;
  bottom: 0;
  align-items: center;
  justify-content: center;
  padding: 10px 0;

  border-top: 1px solid gray;
`;

const QuizActions = () => {
  const { status } = useContext(QuizContext);

  return (
    <StyledWrapper>
      {status === EQuizStatus.INIT && <QuizInitActions />}
    </StyledWrapper>
  );
};

export default QuizActions;
