import { styled } from "@mui/system";
import Quiz from "../components/Quiz";

const StyledWrapper = styled("div")`
  display: flex;
  flex-grow: 1;
`;

const Body = () => {
  return (
    <StyledWrapper>
      <Quiz />
    </StyledWrapper>
  );
};

export default Body;
