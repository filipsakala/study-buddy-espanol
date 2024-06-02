import { Button, Typography, styled } from "@mui/material";
import { useCallback, useEffect } from "react";
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
  width: 64px;
  height: 64px;
`;

const ImagePlaceholder = styled("div")(
  ({ theme }) => `
    width: 64px;
    height: 64px;
  
    // invert black in the dark mode
    ${theme.palette.mode === "dark" && "filter: invert(1) hue-rotate(180deg);"}
  `
);

const ArticlesQuestion = () => {
  const answerQuestion = useContextSelector(
    QuizContext,
    (c) => c.answerQuestion
  );
  const currentAnswer = useContextSelector(
    QuizContext,
    (c) => c.currentAnswer
  ) as string[];
  const setCurrentAnswer = useContextSelector(
    QuizContext,
    (c) => c.setCurrentAnswer
  ) as React.Dispatch<React.SetStateAction<string[]>>;
  const question = useContextSelector(QuizContext, (c) => c.currentQuestion);

  const getButtonVariant = useCallback(
    (questionIndex: number, gender: "M" | "F"): "outlined" | "contained" => {
      const isSelected = currentAnswer[questionIndex] === gender;

      if (isSelected) {
        return "contained";
      }
      return "outlined";
    },
    [currentAnswer]
  );

  const selectAnswer = useCallback(
    (index: number, selectedGender: "M" | "F") => {
      setCurrentAnswer((prev) => {
        const next = [...prev];
        next[index] = selectedGender;
        return next;
      });
    },
    [setCurrentAnswer]
  );

  useEffect(() => {
    const isAnswered = [...Array(question?.question?.length)].reduce(
      (prev, _, index) => {
        if (currentAnswer[index] === undefined) {
          return false;
        }
        return prev;
      },
      true
    );

    if (isAnswered) {
      answerQuestion();
    }
  }, [question, currentAnswer]);

  return (
    <QuestionWrapper>
      {(question.id as number[]).map((id, index) => (
        <ArticleWordWrapper key={id}>
          <div>
            <StyledButton
              variant={getButtonVariant(index, "M")}
              size="large"
              onClick={() => selectAnswer(index, "M")}
            >
              {(question.isSingular as boolean[])[index] ? "el" : "los"}
            </StyledButton>
            <StyledButton
              variant={getButtonVariant(index, "F")}
              size="large"
              onClick={() => selectAnswer(index, "F")}
            >
              {(question.isSingular as boolean[])[index] ? "la" : "las"}
            </StyledButton>
          </div>
          <ImagePlaceholder>
            {(question.icon as string[])[index] && (
              <StyledImg
                src={(question.icon as string[])[index]}
                loading="lazy"
              />
            )}
          </ImagePlaceholder>
          <Word>
            <Typography variant="h6">
              {question.correctAnswer[index]}
            </Typography>
            <Typography variant="caption">
              {question.question[index]}
            </Typography>
          </Word>
        </ArticleWordWrapper>
      ))}
    </QuestionWrapper>
  );
};

export default ArticlesQuestion;
