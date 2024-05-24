import { useContextSelector } from "use-context-selector";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/system";
import { IconButton, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import AnswerTooltip, { TOOLTIP_HIDE_TIMEOUT_SECONDS } from "./QuizTooltip";

const SnackbarWrapper = styled("div")`
  position: absolute;
  top: 8px;
  left: 50%;

  width: 0;

  @media screen and (max-width: 599px) {
    width: calc(100% - 16px);
    left: 8px;
  }
`;

const StyledSnackbar = styled(Snackbar)`
  position: sticky;

  .MuiSnackbarContent-message {
    flex: 1;
  }
`;

const CorrectAnswerMessage = () => {
  const questions = useContextSelector(QuizContext, (c) => c.questions);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const closeTooltip = useCallback(() => setIsTooltipOpen(false), []);
  const currentQuestion = useContextSelector(
    QuizContext,
    (c) => c.currentQuestion
  );

  useEffect(() => {
    setIsTooltipOpen(true);
  }, [currentQuestion?.index]);

  if (!currentQuestion) {
    return null;
  }

  return (
    <SnackbarWrapper>
      <StyledSnackbar
        open={currentQuestion.index > 0 && isTooltipOpen}
        autoHideDuration={TOOLTIP_HIDE_TIMEOUT_SECONDS * 1000}
        message={
          currentQuestion.index > 0 && (
            <AnswerTooltip question={questions[currentQuestion.index - 1]} />
          )
        }
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        action={
          <IconButton onClick={closeTooltip} size="small">
            <Close htmlColor="white" />
          </IconButton>
        }
        onClick={closeTooltip}
        onClose={closeTooltip}
      />
    </SnackbarWrapper>
  );
};

export default CorrectAnswerMessage;
