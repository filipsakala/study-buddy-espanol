import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { QuestionCategory } from "../../../types/Question";
import TranslateWordQuestion from "../Question/TranslateWordQuestion";
import { styled } from "@mui/system";
import WordMatchQuestion from "../Question/WordMatchQuestion";

const StyledQuestionWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuizInProgressBody = () => {
  const { status, questions, currentQuestionIndex } = useContext(QuizContext);
  const currentQuestion = questions[currentQuestionIndex];

  if (status !== EQuizStatus.IN_PROGRESS) {
    return null;
  }

  return (
    <StyledQuestionWrapper>
      {currentQuestion.category === QuestionCategory.TRANSLATE_WORD && (
        <TranslateWordQuestion question={currentQuestion} />
      )}
      {currentQuestion.category === QuestionCategory.WORDS_MATCH && (
        <WordMatchQuestion question={currentQuestion} />
      )}
    </StyledQuestionWrapper>
  );
};

export default QuizInProgressBody;
