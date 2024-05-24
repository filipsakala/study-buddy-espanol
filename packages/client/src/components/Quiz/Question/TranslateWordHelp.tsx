import { QuizContext } from "../../../contexts/QuizContextProvider";
import { styled } from "@mui/system";
import { useContextSelector } from "use-context-selector";

const StyledHelp = styled("div")`
  display: flex;
  gap: 5px;
  font-size: 2em;

  flex-wrap: wrap;
`;

const Letter = styled("div")`
  line-height: 1em;
  height: 2ch;
  width: 30px;
  text-align: center;
  border-bottom: 2px solid;
`;

const TranslateWordHelp = () => {
  const help = useContextSelector(QuizContext, (c) => c.currentQuestionHelp);

  if (!help || !help.length) {
    return null;
  }

  return (
    <StyledHelp>
      {help.map((letter, index) =>
        letter === " " ? (
          <>&nbsp;</>
        ) : (
          <Letter key={index}>{letter || " "}</Letter>
        )
      )}
    </StyledHelp>
  );
};

export default TranslateWordHelp;
