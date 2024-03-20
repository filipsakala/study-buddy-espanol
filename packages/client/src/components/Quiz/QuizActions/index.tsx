import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import QuizInitActions from "./QuizInitActions";
import { styled } from "@mui/material";
import QuizInProgressActions from "./QuizInProgressActions";
import Alert from "../../Alert";

const StyledWrapper = styled("div")`
  display: flex;
  gap: 5px;

  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 10px 0;

  border-top: 1px solid gray;
`;

const StyledAlert = styled(Alert)`
  position: absolute !important;
  bottom: 5px;
  left: 0px;
`;

const QuizActions = () => {
  const { status, hasApiError } = useContext(QuizContext);

  return (
    <StyledWrapper>
      {status === EQuizStatus.INIT && <QuizInitActions />}
      {(status === EQuizStatus.IN_PROGRESS || status === EQuizStatus.DONE) && (
        <QuizInProgressActions />
      )}
      <StyledAlert
        open={hasApiError}
        message="Sorry! 🙏 There was an error while loading your request 😓 Try again later."
      />
    </StyledWrapper>
  );
};

export default QuizActions;
