import { useContextSelector } from "use-context-selector";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import {
  FavoriteTwoTone as FavoriteIcon,
  Favorite as FavoriteBorderIcon,
  HeartBroken as HeartBrokenIcon,
} from "@mui/icons-material";

export const ScoreHeart = ({ score }: { score: number }) => {
  // incorrect
  if (score < 0) {
    return <HeartBrokenIcon color="error" />;
  }
  // correct with help
  if (score === 1) {
    return <FavoriteBorderIcon color="warning" />;
  }
  // correct
  if (score > 1) {
    return <FavoriteBorderIcon color="error" />;
  }
};

const QuizScore = () => {
  const questions = useContextSelector(QuizContext, (c) => c.questions);
  const currentQuestion = useContextSelector(
    QuizContext,
    (c) => c.currentQuestion
  );

  return (
    <div>
      {questions.map((question, i) => {
        return question.questions.map((q) => {
          // next questions
          if (i > currentQuestion.index) {
            return <FavoriteIcon key={q.id} color="disabled" />;
          }
          // not answered
          if (q.score === 0 && currentQuestion.index === i) {
            return <FavoriteIcon key={q.id} color="error" />;
          }
          return <ScoreHeart key={q.id} score={q.score} />;
        });
      })}
    </div>
  );
};

export default QuizScore;
