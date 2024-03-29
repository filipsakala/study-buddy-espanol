import { useContext, useMemo } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { Favorite, HeartBroken } from "@mui/icons-material";
import { styled } from "@mui/system";
import studyBuddy from "../../../assets/study_buddy2.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const ScoreWrapper = styled(`div`)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 75%;
`;

const StyledFavorite = styled(Favorite)`
  @keyframes gelatine {
    from,
    to {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(0.9, 1.1);
    }
    50% {
      transform: scale(1.1, 0.9);
    }
    75% {
      transform: scale(0.95, 1.05);
    }
  }

  animation: gelatine 1s infinite;
`;

const StyledImg = styled("img")`
  max-height: 30vh;
  max-width: 100%;
`;

const QuizDoneBody = () => {
  const { status, score, questions, answers } = useContext(QuizContext);
  const hasIncorrectAnswers = score.some((v) => v < 0);

  const correctAnswerCount = useMemo(() => {
    return score.reduce((prev, current) => {
      let newScore = prev;
      if (current > 0) {
        newScore = prev + 1;
      }
      return newScore;
    }, 0);
  }, [score]);

  if (status !== EQuizStatus.DONE) {
    return null;
  }

  return (
    <Wrapper>
      <h2>
        Your score is {correctAnswerCount} out of {score.length}
      </h2>
      <StyledImg src={studyBuddy} alt="Study buddy img" />
      <ScoreWrapper>
        {score.map((score, i) => {
          if (score > 1)
            return <StyledFavorite key={i} color="error" fontSize="large" />;
          else if (score === 1)
            return <StyledFavorite key={i} color="warning" fontSize="large" />;
          else return <HeartBroken key={i} color="error" fontSize="large" />;
        })}
      </ScoreWrapper>
      {hasIncorrectAnswers && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Excersise</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Your answer</TableCell>
              <TableCell>Correct</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {answers.map((answer, i) => {
              const question = questions[i];
              const isCorrect = score[i] > 0;
              if (isCorrect) {
                return null;
              }

              return (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{question.question}</TableCell>
                  <TableCell>{answer}</TableCell>
                  <TableCell>{question.correctAnswer}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </Wrapper>
  );
};

export default QuizDoneBody;
