import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { styled } from "@mui/system";

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
  const { help } = useContext(QuizContext);

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
