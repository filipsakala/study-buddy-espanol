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

const WordMatchExercise = () => {
  const answerQuestion = useContextSelector(
    QuizContext,
    (c) => c.answerQuestion
  );
  const [selectedQuestionId, setSelectedQuestionId] = useState<
    string | undefined
  >();
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const currentExercise = useContextSelector(
    QuizContext,
    (c) => c.currentExercise
  );
  const [isCorrectQuestion, setIsCorrectQuestion] = useState<boolean[]>([]);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean[]>([]);

  useEffect(() => {
    setIsCorrectQuestion([]);
    setIsCorrectAnswer([]);
  }, [currentExercise.index]);

  const handleAnswer = useCallback(
    (questionId: string, answer: string) => {
      const questionIndex = currentExercise.questions.findIndex(
        ({ id }) => questionId === id
      );
      const answerIndex = currentExercise.questions.findIndex(
        ({ randomizedAnswer }) => randomizedAnswer === answer
      );

      answerQuestion(questionId, answer, questionIndex).then((response) => {
        setIsCorrectQuestion((prev) => {
          const next = [...prev];
          next[questionIndex] = response?.result || false;
          return next;
        });
        setIsCorrectAnswer((prev) => {
          const next = [...prev];
          next[answerIndex] = response?.result || false;
          return next;
        });
        setSelectedAnswer(undefined);
        setSelectedQuestionId(undefined);
      });
    },
    [answerQuestion, currentExercise.questions]
  );

  const selectQuestion = useCallback(
    (id: string) => {
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
        {currentExercise.questions.map((question, index) => {
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
        {currentExercise.questions.map((question, index) => {
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

export default WordMatchExercise;
