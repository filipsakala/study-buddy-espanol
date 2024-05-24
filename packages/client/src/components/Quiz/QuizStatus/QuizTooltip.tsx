import { styled } from "@mui/material";
import { QuizQuestion } from "../../../types/Question";

type Props = {
  question?: QuizQuestion;
};

export const TOOLTIP_HIDE_TIMEOUT_SECONDS = 5;

const TimeoutBar = styled(`div`)`
  margin-top: 5px;
  height: 3px;
  background: white;

  // tooltip keyframes with step every second of a tooltip timeout
  @keyframes timeout {
    ${[...Array(TOOLTIP_HIDE_TIMEOUT_SECONDS + 1)].map((_, i) => {
      const percent = (i * 100) / TOOLTIP_HIDE_TIMEOUT_SECONDS;

      return `${percent}% { width: ${percent}%;}`;
    })}
  }

  animation: timeout ${TOOLTIP_HIDE_TIMEOUT_SECONDS}s normal;
`;

const AnswerTooltip = ({ question }: Props) => {
  if (!question) {
    return null;
  }

  return (
    <>
      {Number(question.score) > 0 && "yep 😍"}
      {Number(question.score) < 0 &&
        `Wrong 😓 ${question.question} = ${question.correctAnswer}`}
      <TimeoutBar />
    </>
  );
};

export default AnswerTooltip;
