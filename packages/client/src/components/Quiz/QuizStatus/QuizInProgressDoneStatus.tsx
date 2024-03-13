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

const ProgressWrapper = styled("div")`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;

  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`;

const QuizInProgressDoneStatus = () => {
  const { status } = useContext(QuizContext);

  if (status !== EQuizStatus.IN_PROGRESS && status !== EQuizStatus.DONE) {
    return null;
  }

  return (
    <StatusWrapper>
      <div>Excersise 4</div>
      <ProgressWrapper>
        <FavoriteBorderIcon color="error" />
        <HeartBrokenIcon color="error" />
        <FavoriteBorderIcon color="error" />
        <FavoriteIcon color="error" />
        <FavoriteIcon color="disabled" />
        <FavoriteIcon color="disabled" />
        <FavoriteIcon color="disabled" />
        <FavoriteIcon color="disabled" />
        <FavoriteIcon color="disabled" />
        <FavoriteIcon color="disabled" />
      </ProgressWrapper>
    </StatusWrapper>
  );
};

export default QuizInProgressDoneStatus;
