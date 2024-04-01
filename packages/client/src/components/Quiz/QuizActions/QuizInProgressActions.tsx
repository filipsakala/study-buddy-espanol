import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import {
  Button,
  IconButton,
  Tooltip,
  TooltipProps,
  Zoom,
  tooltipClasses,
} from "@mui/material";
import styled from "styled-components";
import { Close, HourglassTop } from "@mui/icons-material";
import { QuestionCategory } from "../../../types/Question";

const TOOLTIP_TIMEOUT_SECONDS = 3;

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => {
  return <Tooltip {...props} classes={{ popper: className }} />;
})(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: "1rem",
  },
}));

const TimeoutBar = styled(`div`)`
  height: 3px;
  background: white;

  // tooltip keyframes with step every second of a tooltip timeout
  @keyframes timeout {
    ${[...Array(TOOLTIP_TIMEOUT_SECONDS + 1)].map((_, i) => {
      const percent = (i * 100) / TOOLTIP_TIMEOUT_SECONDS;

      return `${percent}% { width: ${percent}%;}`;
    })}
  }

  animation: timeout ${TOOLTIP_TIMEOUT_SECONDS}s normal;
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
    }, TOOLTIP_TIMEOUT_SECONDS * 1000);
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
        <IconButton onClick={closeTooltip} size="small">
          <Close htmlColor="white" />
        </IconButton>
        <TimeoutBar />
      </>
    );
  }, [currentQuestionIndex, questions, isTooltipForceClosed]);

  return (
    <StyledTooltip
      open={Boolean(tooltipText)}
      title={tooltipText}
      TransitionComponent={Zoom}
      TransitionProps={{ timeout: 100 }}
      placement="bottom"
      arrow
    >
      <div>
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
      </div>
    </StyledTooltip>
  );
};

export default QuizInProgressActions;
