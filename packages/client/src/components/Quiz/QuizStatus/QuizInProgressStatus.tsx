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
  justify-content: flex-end;
  gap: 15px;

  @media screen and (max-width: 820px) {
    justify-content: flex-start;
  }
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
      return currentQuestion.questions[0].learnGroup;
    }

    const groupSet = new Set(
      currentQuestion.questions.map(({ learnGroup }) => learnGroup)
    );
    return [...groupSet].join(", ");
  }, [currentQuestion]);

  if (status !== EQuizStatus.IN_PROGRESS || !currentQuestion) {
    return null;
  }

  return (
    <StatusWrapper>
      <div>
        Excersise {currentQuestion.index + 1} ({learnGroup}) <br />
        <b>
          {currentQuestion.category === QuestionCategory.TRANSLATE_WORD &&
            "Translate this word"}
          {currentQuestion.category === QuestionCategory.ARTICLES &&
            "Select correct articles"}
          {currentQuestion.category === QuestionCategory.WORDS_MATCH &&
            "Match these words"}
        </b>
      </div>
      <QuizScore />
    </StatusWrapper>
  );
};

export default QuizInProgressStatus;
