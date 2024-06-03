import { useMemo } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { styled } from "@mui/system";
import { useContextSelector } from "use-context-selector";
import QuizScore from "../QuizStatus/QuizScore";

const Wrapper = styled("div")`
  width: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const QuizDoneBody = () => {
  const status = useContextSelector(QuizContext, (c) => c.quizStatus);
  const questions = useContextSelector(QuizContext, (c) => c.questions);

  const correctAnswerCount = useMemo(() => {
    return questions.reduce((prev, current) => {
      if (current.score > 0) {
        return prev + 1;
      }
      return prev;
    }, 0);
  }, [questions]);

  if (status !== EQuizStatus.DONE) {
    return null;
  }

  return (
    <Wrapper>
      <h2>
        Your score is {correctAnswerCount} out of {questions.length}
      </h2>
      <QuizScore />
    </Wrapper>
  );
};

export default QuizDoneBody;
