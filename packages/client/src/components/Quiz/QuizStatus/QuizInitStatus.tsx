import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
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
      <FavoriteIcon color="disabled" />
      <FavoriteIcon color="disabled" />
      <FavoriteIcon color="disabled" />
      <FavoriteIcon color="disabled" />
      <FavoriteIcon color="disabled" />
      <FavoriteIcon color="disabled" />
      <FavoriteIcon color="disabled" />
      <FavoriteIcon color="disabled" />
      <FavoriteIcon color="disabled" />
      <FavoriteIcon color="disabled" />
    </ProgressWrapper>
  );
};

export default QuizInitStatus;
