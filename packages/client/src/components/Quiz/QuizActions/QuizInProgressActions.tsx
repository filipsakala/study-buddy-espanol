import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { Button } from "@mui/material";
import { HourglassTop } from "@mui/icons-material";
import { ExerciseCategory } from "../../../types/Question";
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
  const currentExercise = useContextSelector(
    QuizContext,
    (c) => c.currentExercise
  );
  const currentAnswer = useContextSelector(QuizContext, (c) => c.currentAnswer);

  const submitQuestion = useCallback(() => {
    if (currentExercise.category === ExerciseCategory.TRANSLATE_WORD) {
      answerQuestion(currentExercise.questions[0].id, currentAnswer[0]);
    }
  }, [answerQuestion, currentExercise, currentAnswer]);

  if (status !== EQuizStatus.IN_PROGRESS && status !== EQuizStatus.DONE) {
    return null;
  }
  return (
    <>
      {currentExercise.category === ExerciseCategory.TRANSLATE_WORD &&
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
