import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { styled } from "@mui/system";
import {
  FavoriteTwoTone as FavoriteIcon,
  Favorite as FavoriteBorderIcon,
  HeartBroken as HeartBrokenIcon,
} from "@mui/icons-material";

const StatusWrapper = styled("div")`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;

  align-items: center;
  justify-content: space-between;
`;

const LearnGroup = styled("div")`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;

  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`;

const ProgressWrapper = styled("div")`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;

  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`;

const QuizInProgressDoneStatus = () => {
  const { status, currentQuestionIndex, questions, score } =
    useContext(QuizContext);

  if (status !== EQuizStatus.IN_PROGRESS && status !== EQuizStatus.DONE) {
    return null;
  }

  return (
    <StatusWrapper>
      {status === EQuizStatus.IN_PROGRESS && (
        <>
          <div>
            Excersise {currentQuestionIndex + 1} (
            {questions[currentQuestionIndex].learnGroup})
          </div>
          <LearnGroup>
            <b>Translate this word</b>
          </LearnGroup>
        </>
      )}
      <ProgressWrapper>
        {questions.map(({ id }, i) => {
          // next questions
          if (i > currentQuestionIndex) {
            return <FavoriteIcon key={id} color="disabled" />;
          }
          // not answered
          if (score[i] === undefined && currentQuestionIndex === i) {
            return <FavoriteIcon key={id} color="error" />;
          }
          // incorrect
          if (score[i] < 0) {
            return <HeartBrokenIcon key={id} color="error" />;
          }
          // correct
          if (score[i] > 0) {
            return <FavoriteBorderIcon key={id} color="error" />;
          }
        })}
      </ProgressWrapper>
    </StatusWrapper>
  );
};

export default QuizInProgressDoneStatus;
