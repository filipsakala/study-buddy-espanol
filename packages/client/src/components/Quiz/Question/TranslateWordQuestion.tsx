import { IconButton, TextField, styled } from "@mui/material";
import { Question } from "../../../types/Question";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { Help } from "@mui/icons-material";
import TranslateWordHelp from "./TranslateWordHelp";
import { useContextSelector } from "use-context-selector";

type Props = {
  question: Question;
};

const StyledQuestionWrapper = styled("div")(
  ({ theme }) => `
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

min-width: 25vw;

padding: 10px 10px 20px 10px;
border: 1px solid ${theme.palette.divider};
border-radius: 4px;
`
);

const StyledImg = styled("img")`
  width: 128px;
  height: 128px;
`;

const ImagePlaceholder = styled("div")(
  ({ theme }) => `
  width: 128px;
  height: 128px;

  // invert black in the dark mode
  ${theme.palette.mode === "dark" && "filter: invert(1) hue-rotate(180deg);"}
`
);

const TranslateWordQuestion = ({ question }: Props) => {
  const currentAnswer = useContextSelector(QuizContext, (c) => c.currentAnswer);
  const setCurrentAnswer = useContextSelector(
    QuizContext,
    (c) => c.setCurrentAnswer
  );
  const answerQuestion = useContextSelector(
    QuizContext,
    (c) => c.answerQuestion
  );
  const getQuestionHelp = useContextSelector(
    QuizContext,
    (c) => c.getQuestionHelp
  );

  return (
    <StyledQuestionWrapper>
      {question.icon && (
        <ImagePlaceholder>
          <StyledImg src={question.icon} loading="lazy" />
        </ImagePlaceholder>
      )}
      <h3>
        {question.question}
        <IconButton onClick={getQuestionHelp}>
          <Help />
        </IconButton>
      </h3>
      <TranslateWordHelp />
      <TextField
        autoFocus={true}
        value={currentAnswer}
        onChange={(e) => setCurrentAnswer(e.target.value)}
        onKeyUp={(e: any) => {
          if (e.key === "Enter" && currentAnswer) {
            answerQuestion();
          }
        }}
        onBlur={(e) => e.target.focus()}
        focused
      />
    </StyledQuestionWrapper>
  );
};

export default TranslateWordQuestion;
