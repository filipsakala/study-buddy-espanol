import { useMemo } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { styled } from "@mui/system";
import { ExerciseCategory } from "../../../types/Question";
import { useContextSelector } from "use-context-selector";
import QuizScore from "./QuizScore";

const StatusWrapper = styled("div")`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;

  align-items: center;
  justify-content: flex-end;
  gap: 15px;

  @media screen and (max-width: 820px) {
    justify-content: flex-start;
  }
`;

const QuizInProgressStatus = () => {
  const status = useContextSelector(QuizContext, (c) => c.quizStatus);
  const currentExercise = useContextSelector(
    QuizContext,
    (c) => c.currentExercise
  );

  const learnGroup = useMemo(() => {
    if (!currentExercise) {
      return;
    }
    if (currentExercise.category === ExerciseCategory.TRANSLATE_WORD) {
      return currentExercise.questions[0].learnGroup;
    }

    const groupSet = new Set(
      currentExercise.questions.map(({ learnGroup }) => learnGroup)
    );
    return [...groupSet].join(", ");
  }, [currentExercise]);

  if (status !== EQuizStatus.IN_PROGRESS || !currentExercise) {
    return null;
  }

  return (
    <StatusWrapper>
      <div>
        Excersise {currentExercise.index + 1} ({learnGroup}) <br />
        <b>
          {currentExercise.category === ExerciseCategory.TRANSLATE_WORD &&
            "Translate this word"}
          {currentExercise.category === ExerciseCategory.ARTICLES &&
            "Select correct articles"}
          {currentExercise.category === ExerciseCategory.WORDS_MATCH &&
            "Match these words"}
        </b>
      </div>
      <QuizScore />
    </StatusWrapper>
  );
};

export default QuizInProgressStatus;
