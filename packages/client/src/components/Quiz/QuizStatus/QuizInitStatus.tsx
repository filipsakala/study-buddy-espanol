import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus, QUIZ_QUESTION_COUNT } from "../../../types/Quiz";
import { styled } from "@mui/system";
import { FavoriteTwoTone as FavoriteIcon } from "@mui/icons-material";

const ProgressWrapper = styled("div")`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;

  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`;

const QuizInitStatus = () => {
  const { status } = useContext(QuizContext);

  if (status !== EQuizStatus.INIT) {
    return null;
  }

  return (
    <ProgressWrapper>
      {[...Array(QUIZ_QUESTION_COUNT)].map((_, i) => (
        <FavoriteIcon key={i} color="disabled" />
      ))}
    </ProgressWrapper>
  );
};

export default QuizInitStatus;
