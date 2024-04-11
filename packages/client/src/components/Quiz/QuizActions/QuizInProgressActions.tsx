import { useCallback, useEffect, useState } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { Button, IconButton, Snackbar } from "@mui/material";
import styled from "styled-components";
import { Close, HourglassTop } from "@mui/icons-material";
import { QuestionCategory } from "../../../types/Question";
import { useContextSelector } from "use-context-selector";
import AnswerTooltip, { TOOLTIP_HIDE_TIMEOUT_SECONDS } from "./QuizTooltip";

const StyledSnackbar = styled(Snackbar)`
  .MuiSnackbarContent-message {
    flex: 1;
  }
`;

const QuizInProgressActions = () => {
  const status = useContextSelector(QuizContext, (c) => c.quizStatus);
  const isApiLoading = useContextSelector(QuizContext, (c) => c.isApiLoading);
  const answerQuestion = useContextSelector(
    QuizContext,
    (c) => c.answerQuestion
  );
  const startQuiz = useContextSelector(QuizContext, (c) => c.startQuiz);
  const currentQuestion = useContextSelector(
    QuizContext,
    (c) => c.currentQuestion
  );
  const questions = useContextSelector(QuizContext, (c) => c.questions);

  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const closeTooltip = useCallback(() => setIsTooltipOpen(false), []);

  useEffect(() => {
    setIsTooltipOpen(true);
  }, [currentQuestion.index]);

  if (status !== EQuizStatus.IN_PROGRESS && status !== EQuizStatus.DONE) {
    return null;
  }

  return (
    <>
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
      <>
        {currentQuestion &&
          currentQuestion.category === QuestionCategory.TRANSLATE_WORD &&
          status === EQuizStatus.IN_PROGRESS && (
            <Button
              variant="contained"
              color="success"
              disabled={isApiLoading}
              onClick={answerQuestion}
            >
              Submit answer {isApiLoading && <HourglassTop />}
            </Button>
          )}
        {status === EQuizStatus.DONE && (
          <Button
            variant="contained"
            color="success"
            disabled={isApiLoading}
            onClick={startQuiz}
          >
            Start Quiz {isApiLoading && <HourglassTop />}
          </Button>
        )}
      </>
    </>
  );
};

export default QuizInProgressActions;
