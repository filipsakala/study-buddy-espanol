import { TextField } from "@mui/material";
import { AnsweredQuestion } from "../../../types/Question";
import { styled } from "@mui/system";
import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";

type Props = {
  question: AnsweredQuestion;
};

const StyledQuestionWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 25vw;
  min-height: 40vh;

  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 4px;
`;

const StyledImg = styled("img")`
  max-height: 150px;
`;

const TranslateWordQuestion = ({ question }: Props) => {
  const { currentAnswer, setCurrentAnswer, answerQuestion } =
    useContext(QuizContext);

  return (
    <>
      <h2>Translate this word</h2>
      <StyledQuestionWrapper>
        {question.icon && <StyledImg src={question.icon} loading="lazy" />}
        <h3>{question.question}</h3>
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
        />
      </StyledQuestionWrapper>
    </>
  );
};

export default TranslateWordQuestion;
