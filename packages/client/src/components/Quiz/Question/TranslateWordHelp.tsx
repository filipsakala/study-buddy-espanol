import { QuizContext } from "../../../contexts/QuizContextProvider";
import { styled } from "@mui/system";
import { useContextSelector } from "use-context-selector";

const StyledHelp = styled("div")`
  display: flex;
  gap: 5px;
  font-size: 2em;
`;

const Letter = styled("div")`
  width: 1ch;
  text-align: center;
`;

const TranslateWordHelp = () => {
  const help = useContextSelector(QuizContext, (c) => c.help);

  if (!help || !help.length) {
    return null;
  }

  return (
    <StyledHelp>
      {help.map((letter, index) => (
        <Letter key={index}>{letter || "_"}</Letter>
      ))}
    </StyledHelp>
  );
};

export default TranslateWordHelp;
