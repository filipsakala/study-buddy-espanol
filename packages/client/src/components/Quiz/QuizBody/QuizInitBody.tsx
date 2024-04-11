import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import studyBuddy from "../../../assets/study_buddy-450.png";
import { styled } from "@mui/system";
import { useContextSelector } from "use-context-selector";

const StyledImg = styled("img")`
  max-height: 50vh;
  max-width: 100%;
`;

const QuizInitBody = () => {
  const status = useContextSelector(QuizContext, (c) => c.quizStatus);

  if (status !== EQuizStatus.INIT) {
    return null;
  }

  return <StyledImg src={studyBuddy} alt="Study buddy img" />;
};

export default QuizInitBody;
