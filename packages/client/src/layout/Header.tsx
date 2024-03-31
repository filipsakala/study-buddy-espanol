import { Chip, styled } from "@mui/material";

const StyledHeader = styled("header")(
  ({ theme }) => `
  border-bottom: 1px solid ${theme.palette.divider};
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
      <a href="/" style={{ lineHeight: 0 }}>
        <StyledLogo src="/logo-60.png" alt="Study buddy" />
      </a>
      <StyledAppName>Study Buddy Español</StyledAppName>
      <Chip variant="outlined" label="Curso A1" />
    </StyledHeader>
  );
};

export default Header;
