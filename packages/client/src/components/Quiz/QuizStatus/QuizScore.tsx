import { useContextSelector } from "use-context-selector";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { QuestionCategory } from "../../../types/Question";
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
        const useId = (
          question.category === QuestionCategory.TRANSLATE_WORD
            ? question.id
            : (question.id as number[])[0]
        ) as number;
        // next questions
        if (i > currentQuestion.index) {
          return <FavoriteIcon key={useId} color="disabled" />;
        }
        // not answered
        if (question.score === 0 && currentQuestion.index === i) {
          return <FavoriteIcon key={useId} color="error" />;
        }
        // incorrect
        if (question.score < 0) {
          return <HeartBrokenIcon key={useId} color="error" />;
        }
        // correct with help
        if (question.score === 1) {
          return <FavoriteBorderIcon key={useId} color="warning" />;
        }
        // correct
        if (question.score > 1) {
          return <FavoriteBorderIcon key={useId} color="error" />;
        }
      })}
    </div>
  );
};

export default QuizScore;
