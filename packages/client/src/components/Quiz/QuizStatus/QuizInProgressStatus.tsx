import { useContext, useMemo } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { styled } from "@mui/system";
import {
  FavoriteTwoTone as FavoriteIcon,
  Favorite as FavoriteBorderIcon,
  HeartBroken as HeartBrokenIcon,
} from "@mui/icons-material";
import { QuestionCategory } from "../../../types/Question";

const StatusWrapper = styled("div")`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;

  align-items: center;
  justify-content: space-between;
`;

const QuizInProgressStatus = () => {
  const { status, currentQuestionIndex, questions, score } =
    useContext(QuizContext);

  const learnGroup = useMemo(() => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.category === QuestionCategory.TRANSLATE_WORD) {
      return questions[currentQuestionIndex].learnGroup;
    }

    const groupSet = new Set(
      questions[currentQuestionIndex].learnGroup as string[]
    );
    return [...groupSet].join(", ");
  }, [questions, currentQuestionIndex]);

  if (status !== EQuizStatus.IN_PROGRESS) {
    return null;
  }

  return (
    <StatusWrapper>
      <div>
        Excersise {currentQuestionIndex + 1} ({learnGroup})
      </div>
      <div>
        {questions[currentQuestionIndex].category ===
        QuestionCategory.TRANSLATE_WORD ? (
          <b>Translate this word</b>
        ) : (
          <b>Match these words</b>
        )}
      </div>
      <div>
        {questions.map(({ id, category }, i) => {
          const useId = (
            category === QuestionCategory.TRANSLATE_WORD
              ? id
              : (id as number[])[0]
          ) as number;
          // next questions
          if (i > currentQuestionIndex) {
            return <FavoriteIcon key={useId} color="disabled" />;
          }
          // not answered
          if (score[i] === undefined && currentQuestionIndex === i) {
            return <FavoriteIcon key={useId} color="error" />;
          }
          // incorrect
          if (score[i] < 0) {
            return <HeartBrokenIcon key={useId} color="error" />;
          }
          // correct with help
          if (score[i] === 1) {
            return <FavoriteBorderIcon key={useId} color="warning" />;
          }
          // correct
          if (score[i] > 1) {
            return <FavoriteBorderIcon key={useId} color="error" />;
          }
        })}
      </div>
    </StatusWrapper>
  );
};

export default QuizInProgressStatus;
