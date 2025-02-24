import { Button, Typography, styled } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { useContextSelector } from "use-context-selector";

const QuestionWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 1.5em;
  padding: 10px;
`;

const ArticleWordWrapper = styled("div")`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2em;
`;

const Word = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  display: inline-block;
  text-transform: lowercase;
  height: 4.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: unset;
`;

const StyledImg = styled("img")`
  width: 32px;
  height: 32px;
`;

const ImagePlaceholder = styled("div")(
  ({ theme }) => `
    width: 32px;
    height: 32px;
  
    // invert black in the dark mode
    ${theme.palette.mode === "dark" && "filter: invert(1) hue-rotate(180deg);"}
  `
);

const getButtonVariant = (isSelected: boolean): "outlined" | "contained" => {
  return isSelected ? "contained" : "outlined";
};

const getButtonColor = (
  isCorrect?: boolean
): "error" | "success" | "primary" => {
  if (isCorrect === undefined) {
    return "primary";
  }
  if (isCorrect) {
    return "success";
  }
  return "error";
};

const ArticlesExercise = () => {
  const answerQuestion = useContextSelector(
    QuizContext,
    (c) => c.answerQuestion
  );
  const currentAnswer = useContextSelector(QuizContext, (c) => c.currentAnswer);
  const currentExercise = useContextSelector(
    QuizContext,
    (c) => c.currentExercise
  );
  const [isCorrect, setIsCorrect] = useState<boolean[]>([]);

  useEffect(() => {
    setIsCorrect([]);
  }, [currentExercise.index]);

  const selectAnswer = useCallback(
    (index: number, selectedGender: "M" | "F") => {
      if (currentAnswer[index] !== undefined) {
        return;
      }

      const answeredQuestion = currentExercise.questions[index];

      answerQuestion(answeredQuestion.id, selectedGender, index).then(
        (response) => {
          setIsCorrect((prev) => {
            const next = [...prev];
            next[index] = response?.result || false;
            return next;
          });
        }
      );
    },
    [currentExercise, answerQuestion, currentAnswer]
  );

  return (
    <QuestionWrapper>
      {currentExercise.questions.map((question, index) => (
        <ArticleWordWrapper key={question.id}>
          <div>
            <StyledButton
              variant={getButtonVariant(currentAnswer[index] === "M")}
              color={getButtonColor(isCorrect[index])}
              size="large"
              onClick={() => selectAnswer(index, "M")}
            >
              {question.isSingular ? "el" : "los"}
            </StyledButton>
            <StyledButton
              variant={getButtonVariant(currentAnswer[index] === "F")}
              color={getButtonColor(isCorrect[index])}
              size="large"
              onClick={() => selectAnswer(index, "F")}
            >
              {question.isSingular ? "la" : "las"}
            </StyledButton>
          </div>
          <ImagePlaceholder>
            {question.icon && <StyledImg src={question.icon} loading="lazy" />}
          </ImagePlaceholder>
          <Word>
            <Typography variant="h6">{question.textEs}</Typography>
            <Typography variant="caption">{question.textEn}</Typography>
          </Word>
        </ArticleWordWrapper>
      ))}
    </QuestionWrapper>
  );
};

export default ArticlesExercise;
