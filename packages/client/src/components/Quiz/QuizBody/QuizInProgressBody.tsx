import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { QuestionCategory } from "../../../types/Question";
import TranslateWordQuestion from "../Question/TranslateWordQuestion";
import { styled } from "@mui/system";
import WordMatchQuestion from "../Question/WordMatchQuestion";
import { useContextSelector } from "use-context-selector";

const StyledQuestionWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuizInProgressBody = () => {
  const status = useContextSelector(QuizContext, (c) => c.quizStatus);
  const currentQuestion = useContextSelector(
    QuizContext,
    (c) => c.currentQuestion
  );

  if (status !== EQuizStatus.IN_PROGRESS || !currentQuestion) {
    return null;
  }

  return (
    <StyledQuestionWrapper>
      {currentQuestion.category === QuestionCategory.TRANSLATE_WORD && (
        <TranslateWordQuestion />
      )}
      {currentQuestion.category === QuestionCategory.WORDS_MATCH && (
        <WordMatchQuestion />
      )}
    </StyledQuestionWrapper>
  );
};

export default QuizInProgressBody;
