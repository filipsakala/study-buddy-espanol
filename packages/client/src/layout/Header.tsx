import { Chip, styled } from "@mui/material";
import QuizStatus from "../components/Quiz/QuizStatus";
import CorrectAnswerMessage from "../components/Quiz/QuizStatus/CorrectAnswerMessage";
import QuizSettings from "../components/Quiz/QuizSettings";

const StyledHeader = styled("header")(
  ({ theme }) => `
  border-bottom: 1px solid ${theme.palette.divider};
  padding: ${theme.spacing(2)};
  display: flex;
  align-items: center;
  padding: 25px;

  @media screen and (max-width: 599px) {
    padding: 10px 25px;
  }

`
);

const StyledLogo = styled("img")`
  width: 3em;
  height: 3em;

  @media screen and (max-width: 599px) {
    width: 1.8em;
    height: 1.8em;
  }
`;

const StyledAppName = styled("span")`
  font-size: 1.5em;
  padding: 0 0.4em;

  @media screen and (max-width: 599px) {
    font-size: 0.9em;
  }
`;

const Header = () => {
  return (
    <div>
      <StyledHeader>
        <a href="/" style={{ lineHeight: 0 }}>
          <StyledLogo src="/logo-60.png" alt="Study buddy" />
        </a>
        <StyledAppName>Study Buddy Español</StyledAppName>
        <QuizSettings />
      </StyledHeader>
      <QuizStatus />
      <CorrectAnswerMessage />
    </div>
  );
};

export default Header;
