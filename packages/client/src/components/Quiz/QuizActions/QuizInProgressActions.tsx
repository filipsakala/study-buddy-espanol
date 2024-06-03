import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { Button } from "@mui/material";
import { HourglassTop } from "@mui/icons-material";
import { QuestionCategory } from "../../../types/Question";
import { useContextSelector } from "use-context-selector";
import { useCallback } from "react";

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
  const currentAnswer = useContextSelector(QuizContext, (c) => c.currentAnswer);

  const submitQuestion = useCallback(() => {
    if (currentQuestion.category === QuestionCategory.TRANSLATE_WORD) {
      answerQuestion(currentQuestion.questions[0].id, currentAnswer[0]);
    }
  }, [answerQuestion, currentQuestion, currentAnswer]);

  if (status !== EQuizStatus.IN_PROGRESS && status !== EQuizStatus.DONE) {
    return null;
  }
  return (
    <>
      {currentQuestion.category === QuestionCategory.TRANSLATE_WORD &&
        status === EQuizStatus.IN_PROGRESS && (
          <Button
            variant="contained"
            color="success"
            disabled={isApiLoading}
            onClick={submitQuestion}
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
  );
};

export default QuizInProgressActions;
