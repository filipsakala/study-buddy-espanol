import { useContext, useMemo } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import {
  Button,
  Tooltip,
  TooltipProps,
  Zoom,
  tooltipClasses,
} from "@mui/material";
import styled from "styled-components";
import { HourglassTop } from "@mui/icons-material";

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: "1rem",
  },
}));

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

  if (status !== EQuizStatus.IN_PROGRESS && status !== EQuizStatus.DONE) {
    return null;
  }

  const tooltipText = useMemo(() => {
    if (!currentQuestionIndex) {
      return;
    }

    const lastQuestionScore = score[currentQuestionIndex - 1];

    if (lastQuestionScore > 0) {
      return "yep 😍";
    }

    const lastQuestion = questions[currentQuestionIndex - 1];
    return `Wrong 😓 ${lastQuestion.question} = ${lastQuestion.correctAnswer}`;
  }, [currentQuestionIndex, questions]);

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
        {status === EQuizStatus.IN_PROGRESS && (
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
