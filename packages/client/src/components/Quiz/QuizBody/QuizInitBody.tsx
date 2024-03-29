import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import studyBuddy from "../../../assets/study_buddy-300.png";
import { styled } from "@mui/system";

const StyledImg = styled("img")`
  max-height: 50vh;
  max-width: 100%;
`;

const QuizInitBody = () => {
  const { status } = useContext(QuizContext);

  if (status !== EQuizStatus.INIT) {
    return null;
  }

  return (
    <div>
      <StyledImg src={studyBuddy} alt="Study buddy img" />
    </div>
  );
};

export default QuizInitBody;
