import { Chip } from "@mui/material";
import { styled } from "@mui/system";

const StyledHeader = styled("header")(
  ({ theme }) => `
  border-bottom: 1px solid gray;
  padding: ${theme.spacing(2)};
  display: flex;
  align-items: center;
  height: 30px;
  padding:25px;
`
);

const StyledLogo = styled("img")`
  width: 3em;
  height: 3em;
`;

const StyledAppName = styled("span")`
  font-size: 1.5em;
  padding: 0 0.4em;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledLogo src="/logo-60.png" alt="Study buddy" />
      <StyledAppName>Study Buddy Español</StyledAppName>
      <Chip variant="outlined" label="Curso A1" />
    </StyledHeader>
  );
};

export default Header;
