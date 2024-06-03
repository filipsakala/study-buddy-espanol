import { useContextSelector } from "use-context-selector";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import {
  FavoriteTwoTone as FavoriteIcon,
  Favorite as FavoriteBorderIcon,
  HeartBroken as HeartBrokenIcon,
} from "@mui/icons-material";

const QuizScore = () => {
  const questions = useContextSelector(QuizContext, (c) => c.questions);
  const currentQuestion = useContextSelector(
    QuizContext,
    (c) => c.currentQuestion
  );

  return (
    <div>
      {questions.map((question, i) => {
        // next questions
        if (i > currentQuestion.index) {
          return <FavoriteIcon key={i} color="disabled" />;
        }
        // not answered
        if (question.score === 0 && currentQuestion.index === i) {
          return <FavoriteIcon key={i} color="error" />;
        }
        // incorrect
        if (question.score < 0) {
          return <HeartBrokenIcon key={i} color="error" />;
        }
        // correct with help
        if (question.score === 1) {
          return <FavoriteBorderIcon key={i} color="warning" />;
        }
        // correct
        if (question.score > 1) {
          return <FavoriteBorderIcon key={i} color="error" />;
        }
      })}
    </div>
  );
};

export default QuizScore;
