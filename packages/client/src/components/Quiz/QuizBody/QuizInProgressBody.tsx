import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { QuestionCategory } from "../../../types/Question";
import TranslateWordQuestion from "../Question/TranslateWordQuestion";
import WordMatchQuestion from "../Question/WordMatchQuestion";
import { useContextSelector } from "use-context-selector";

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
    <>
      {currentQuestion.category === QuestionCategory.TRANSLATE_WORD && (
        <TranslateWordQuestion />
      )}
      {currentQuestion.category === QuestionCategory.WORDS_MATCH && (
        <WordMatchQuestion />
      )}
    </>
  );
};

export default QuizInProgressBody;
