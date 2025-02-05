import { TextField, styled } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { useContextSelector } from "use-context-selector";

const StyledQuestionWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 25vw;

  padding: 10px 10px 20px 10px;
  border-radius: 4px;
`;

const PRETERITO_PREFIXES = [
  "yo",
  "tú",
  "el/ella",
  "nosotros",
  "vosotros",
  "ellos",
];

const PreteritoIndefinidoExercise = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answerInput, setAnswerInput] = useState<string>("");
  const answerQuestion = useContextSelector(
    QuizContext,
    (c) => c.answerQuestion
  );
  const currentExercise = useContextSelector(
    QuizContext,
    (c) => c.currentExercise
  );
  const question = currentExercise.questions[currentIndex];
  const setCurrentAnswer = useContextSelector(
    QuizContext,
    (c) => c.setCurrentAnswer
  ) as React.Dispatch<React.SetStateAction<string[]>>;

  const handleAnswerChange = useCallback(
    (e: any) => {
      setCurrentAnswer((prev) => {
        prev[currentIndex] = e.target.value;
        return [...prev];
      });
      setAnswerInput(e.target.value);
    },
    [currentIndex, setCurrentAnswer]
  );
  const handleSubmitAnswer = useCallback(
    (e: any) => {
      if (e.key === "Enter" && answerInput) {
        answerQuestion(
          question.id,
          answerInput,
          currentIndex,
          question?.randomizedAnswer
        );

        setAnswerInput("");
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [question, answerQuestion, answerInput, currentIndex]
  );

  useEffect(() => {
    setCurrentIndex(0);
  }, [currentExercise.index]);

  return (
    <StyledQuestionWrapper>
      <h3 style={{ marginBottom: 5 }}>{question?.textEs}</h3>
      {PRETERITO_PREFIXES[Number(question?.randomizedAnswer) - 1]}
      <TextField
        autoFocus={true}
        value={answerInput}
        onChange={handleAnswerChange}
        onKeyUp={handleSubmitAnswer}
        onBlur={(e) => e.target.focus()}
        focused
        sx={{ mt: 2 }}
      />
    </StyledQuestionWrapper>
  );
};

export default PreteritoIndefinidoExercise;
