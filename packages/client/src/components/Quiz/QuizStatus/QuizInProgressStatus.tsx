import { useMemo } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { styled } from "@mui/system";
import { QuestionCategory } from "../../../types/Question";
import { useContextSelector } from "use-context-selector";
import QuizScore from "./QuizScore";

const StatusWrapper = styled("div")`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;

  align-items: center;
  justify-content: space-between;
`;

const QuizInProgressStatus = () => {
  const status = useContextSelector(QuizContext, (c) => c.quizStatus);
  const currentQuestion = useContextSelector(
    QuizContext,
    (c) => c.currentQuestion
  );

  const learnGroup = useMemo(() => {
    if (!currentQuestion) {
      return;
    }
    if (currentQuestion.category === QuestionCategory.TRANSLATE_WORD) {
      return currentQuestion.learnGroup;
    }

    const groupSet = new Set(currentQuestion.learnGroup as string[]);
    return [...groupSet].join(", ");
  }, [currentQuestion]);

  if (status !== EQuizStatus.IN_PROGRESS || !currentQuestion) {
    return null;
  }

  return (
    <StatusWrapper>
      <div>
        Excersise {currentQuestion.index + 1} ({learnGroup})
      </div>
      <div>
        {currentQuestion.category === QuestionCategory.TRANSLATE_WORD ? (
          <b>Translate this word</b>
        ) : (
          <b>Match these words</b>
        )}
      </div>
      <QuizScore />
    </StatusWrapper>
  );
};

export default QuizInProgressStatus;
