import { styled } from "@mui/system";
import { QuizContextProvider } from "../../contexts/QuizContextProvider";
import QuizStatus from "./QuizStatus";
import QuizBody from "./QuizBody";
import QuizActions from "./QuizActions";

const StyledWrapper = styled("div")`
  display: flex;
  flex-direction: column;
`;

const Quiz = () => {
  return (
    <QuizContextProvider>
      <StyledWrapper>
        <QuizStatus />
        <QuizBody />
        <QuizActions />
      </StyledWrapper>
    </QuizContextProvider>
  );
};

export default Quiz;
