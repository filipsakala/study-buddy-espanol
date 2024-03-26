import { IconButton, TextField } from "@mui/material";
import { AnsweredQuestion } from "../../../types/Question";
import { styled } from "@mui/system";
import { useContext } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { Help } from "@mui/icons-material";
import TranslateWordHelp from "./TranslateWordHelp";

type Props = {
  question: AnsweredQuestion;
};

const StyledQuestionWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 25vw;

  padding: 10px 10px 20px 10px;
  border: 1px solid lightgray;
  border-radius: 4px;
`;

const StyledImg = styled("img")`
  max-height: 150px;
`;

const TranslateWordQuestion = ({ question }: Props) => {
  const { currentAnswer, setCurrentAnswer, answerQuestion, getQuestionHelp } =
    useContext(QuizContext);

  return (
    <>
      <StyledQuestionWrapper>
        {question.icon && <StyledImg src={question.icon} loading="lazy" />}
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
    </>
  );
};

export default TranslateWordQuestion;
