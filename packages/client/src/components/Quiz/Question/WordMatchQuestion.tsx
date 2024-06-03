import { Button, styled } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { useContextSelector } from "use-context-selector";

const MatchColumns = styled("div")`
  display: grid;
  grid-gap: 1.5em;
  grid-template-columns: 1fr 1fr;
  padding: 10px;
`;

const MatchColumn = styled("div")`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.5em;
`;

const StyledButton = styled(Button)`
  text-transform: lowercase;
  height: 4.5em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledImg = styled("img")`
  width: 32px;
  height: 32px;
`;

const getButtonVariant = (isSelected: boolean): "outlined" | "contained" => {
  return isSelected ? "contained" : "outlined";
};

const getColor = (isCorrect?: boolean): "primary" | "error" | "success" => {
  if (isCorrect === undefined) {
    return "primary";
  }
  if (isCorrect) {
    return "success";
  }
  return "error";
};

const WordMatchQuestion = () => {
  const answerQuestion = useContextSelector(
    QuizContext,
    (c) => c.answerQuestion
  );
  const [selectedQuestionId, setSelectedQuestionId] = useState<
    number | undefined
  >();
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const currentQuestion = useContextSelector(
    QuizContext,
    (c) => c.currentQuestion
  );
  const [isCorrectQuestion, setIsCorrectQuestion] = useState<boolean[]>([]);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean[]>([]);

  useEffect(() => {
    setIsCorrectQuestion([]);
    setIsCorrectAnswer([]);
  }, [currentQuestion]);

  const handleAnswer = useCallback(
    (questionId: number, answer: string) => {
      const questionIndex = currentQuestion.questions.findIndex(
        ({ id }) => questionId === id
      );
      const answerIndex = currentQuestion.questions.findIndex(
        ({ randomizedAnswer }) => randomizedAnswer === answer
      );

      answerQuestion(questionId, answer, questionIndex).then((isCorrect) => {
        setIsCorrectQuestion((prev) => {
          const next = [...prev];
          next[questionIndex] = isCorrect;
          return next;
        });
        setIsCorrectAnswer((prev) => {
          const next = [...prev];
          next[answerIndex] = isCorrect;
          return next;
        });
        setSelectedAnswer(undefined);
        setSelectedQuestionId(undefined);
      });
    },
    [answerQuestion]
  );

  const selectQuestion = useCallback(
    (id: number) => {
      // unselect selected
      if (selectedQuestionId === id) {
        setSelectedQuestionId(undefined);
        return;
      }

      setSelectedQuestionId(id);

      if (selectedAnswer) {
        handleAnswer(id, selectedAnswer);
      }
    },
    [selectedQuestionId, selectedAnswer, handleAnswer]
  );

  const selectAnswer = useCallback(
    (answer: string) => {
      // unselect selected
      if (selectedAnswer === answer) {
        setSelectedAnswer(undefined);
        return;
      }

      setSelectedAnswer(answer);

      if (selectedQuestionId) {
        handleAnswer(selectedQuestionId, answer);
      }
    },
    [selectedQuestionId, selectedAnswer, handleAnswer]
  );

  return (
    <MatchColumns>
      <MatchColumn>
        {currentQuestion.questions.map((question, index) => {
          return (
            <StyledButton
              key={question.id}
              variant={getButtonVariant(question.id === selectedQuestionId)}
              color={getColor(isCorrectQuestion[index])}
              size="large"
              onClick={() => selectQuestion(question.id)}
              disabled={isCorrectQuestion[index]}
              startIcon={
                question.icon && (
                  <StyledImg src={question.icon} loading="lazy" />
                )
              }
            >
              {question.textEn}
            </StyledButton>
          );
        })}
      </MatchColumn>
      <MatchColumn>
        {currentQuestion.questions.map((question, index) => {
          return (
            <StyledButton
              key={question.id}
              variant={getButtonVariant(
                question.randomizedAnswer === selectedAnswer
              )}
              color={getColor(isCorrectAnswer[index])}
              size="large"
              onClick={() => selectAnswer(question.randomizedAnswer as string)}
              disabled={isCorrectAnswer[index]}
            >
              {question.randomizedAnswer}
            </StyledButton>
          );
        })}
      </MatchColumn>
    </MatchColumns>
  );
};

export default WordMatchQuestion;
