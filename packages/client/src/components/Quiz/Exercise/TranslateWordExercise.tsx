import { Button, TextField, styled } from "@mui/material";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { Help } from "@mui/icons-material";
import TranslateWordHelp from "./TranslateWordHelp";
import { useContextSelector } from "use-context-selector";
import { useCallback } from "react";

const StyledQuestionWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 25vw;

  padding: 10px 10px 20px 10px;
  border-radius: 4px;
`;

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

const TranslateWordExercise = () => {
  const answerQuestion = useContextSelector(
    QuizContext,
    (c) => c.answerQuestion
  );
  const getQuestionHelp = useContextSelector(
    QuizContext,
    (c) => c.getQuestionHelp
  );
  const question = useContextSelector(
    QuizContext,
    (c) => c.currentExercise.questions[0]
  );
  const currentAnswer = useContextSelector(
    QuizContext,
    (c) => c.currentAnswer[0] || ""
  ) as string;
  const setCurrentAnswer = useContextSelector(
    QuizContext,
    (c) => c.setCurrentAnswer
  ) as React.Dispatch<React.SetStateAction<string[]>>;

  const handleAnswerChange = useCallback(
    (e: any) => setCurrentAnswer([e.target.value]),
    [setCurrentAnswer]
  );

  const handleSubmitAnswer = useCallback(
    (e: any) => {
      if (e.key === "Enter" && currentAnswer) {
        answerQuestion(question.id, currentAnswer);
      }
    },
    [question, currentAnswer, answerQuestion]
  );

  return (
    <StyledQuestionWrapper>
      {question.icon && (
        <ImagePlaceholder>
          <StyledImg src={question.icon} loading="lazy" />
        </ImagePlaceholder>
      )}
      <h3 style={{ marginBottom: 5 }}>{question.textEn}</h3>
      <Button
        onClick={getQuestionHelp}
        startIcon={<Help />}
        size="small"
        variant="outlined"
        color="info"
        sx={{ mb: 2 }}
      >
        Get hint
      </Button>
      <TranslateWordHelp />
      <TextField
        autoFocus={true}
        value={currentAnswer}
        onChange={handleAnswerChange}
        onKeyUp={handleSubmitAnswer}
        onBlur={(e) => e.target.focus()}
        focused
        sx={{ mt: 2 }}
      />
    </StyledQuestionWrapper>
  );
};

export default TranslateWordExercise;
