import { styled } from "@mui/system";
import QuizBody from "../components/Quiz/QuizBody";

const StyledWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  flex: 1;

  background-color: #f3f3f3;

  overflow-y: auto;
`;

const Body = () => {
  return (
    <StyledWrapper>
      <QuizBody />
    </StyledWrapper>
  );
};

export default Body;
