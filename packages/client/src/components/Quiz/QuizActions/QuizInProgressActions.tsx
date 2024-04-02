import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { Button, IconButton, Snackbar } from "@mui/material";
import styled from "styled-components";
import { Close, HourglassTop } from "@mui/icons-material";
import { QuestionCategory } from "../../../types/Question";

const RESULT_TIMEOUT_SECONDS = 5;

const StyledSnackbar = styled(Snackbar)`
  .MuiSnackbarContent-message {
    flex: 1;
  }
`;

const TimeoutBar = styled(`div`)`
  margin-top: 5px;
  height: 3px;
  background: white;

  // tooltip keyframes with step every second of a tooltip timeout
  @keyframes timeout {
    ${[...Array(RESULT_TIMEOUT_SECONDS + 1)].map((_, i) => {
      const percent = (i * 100) / RESULT_TIMEOUT_SECONDS;

      return `${percent}% { width: ${percent}%;}`;
    })}
  }

  animation: timeout ${RESULT_TIMEOUT_SECONDS}s normal;
`;

const QuizInProgressActions = () => {
  const {
    status,
    isApiLoading,
    answerQuestion,
    startQuiz,
    questions,
    currentQuestionIndex,
    score,
  } = useContext(QuizContext);
  const [isTooltipForceClosed, setIsTooltipForceClosed] =
    useState<boolean>(false);

  const closeTooltip = useCallback(() => setIsTooltipForceClosed(true), []);

  useEffect(() => {
    setIsTooltipForceClosed(false);
  }, [currentQuestionIndex]);

  // hide tooltip after a while
  useEffect(() => {
    setTimeout(() => {
      setIsTooltipForceClosed(true);
    }, RESULT_TIMEOUT_SECONDS * 1000);
  }, [currentQuestionIndex]);

  if (status !== EQuizStatus.IN_PROGRESS && status !== EQuizStatus.DONE) {
    return null;
  }

  const tooltipText = useMemo(() => {
    if (!currentQuestionIndex || isTooltipForceClosed) {
      return;
    }

    const lastQuestionScore = score[currentQuestionIndex - 1];
    const lastQuestion = questions[currentQuestionIndex - 1];

    return (
      <>
        {lastQuestionScore > 0 && "yep 😍"}
        {lastQuestionScore < 0 &&
          `Wrong 😓 ${lastQuestion.question} = ${lastQuestion.correctAnswer}`}
        <TimeoutBar />
      </>
    );
  }, [currentQuestionIndex, questions, isTooltipForceClosed]);

  return (
    <>
      <StyledSnackbar
        open={Boolean(tooltipText)}
        autoHideDuration={RESULT_TIMEOUT_SECONDS * 1000}
        message={tooltipText}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        action={
          <IconButton onClick={closeTooltip} size="small">
            <Close htmlColor="white" />
          </IconButton>
        }
        onClick={closeTooltip}
      />
      <>
        {questions[currentQuestionIndex] &&
          questions[currentQuestionIndex].category ===
            QuestionCategory.TRANSLATE_WORD &&
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
