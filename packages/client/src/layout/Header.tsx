import { styled } from "@mui/material";
import QuizStatus from "../components/Quiz/QuizStatus";

const StyledHeader = styled("header")(
  ({ theme }) => `
  border-bottom: 1px solid ${theme.palette.divider};
  padding: ${theme.spacing(2)};
  display: flex;
  align-items: center;
  padding: 25px;
  flex-wrap: wrap;
  gap: 10px;

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
    <StyledHeader>
      <a href="/" style={{ lineHeight: 0 }}>
        <StyledLogo src="/logo-60.png" alt="Study buddy" />
      </a>
      <StyledAppName>Study Buddy Español</StyledAppName>
      <QuizStatus />
    </StyledHeader>
  );
};

export default Header;
