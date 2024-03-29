import { useContext, useMemo } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { Favorite, HeartBroken, RecordVoiceOver } from "@mui/icons-material";
import { styled } from "@mui/system";
import studyBuddy from "../../../assets/study_buddy2-300.png";
import {
  IconButton,
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

const ScoreHeart = ({ score }: { score: number }) => {
  if (score > 1) return <StyledFavorite color="error" fontSize="large" />;
  else if (score === 1)
    return <StyledFavorite color="warning" fontSize="large" />;
  else return <HeartBroken color="error" fontSize="large" />;
};

const QuizDoneBody = () => {
  const { status, score, questions, answers, playAnswerAudio } =
    useContext(QuizContext);

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

            return (
              <TableRow key={i}>
                <TableCell>
                  <ScoreHeart score={score[i]} />
                </TableCell>
                <TableCell>{question.question}</TableCell>
                <TableCell>{answer}</TableCell>
                <TableCell>
                  {question.correctAnswer}
                  <IconButton onClick={() => playAnswerAudio(question.id)}>
                    <RecordVoiceOver />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Wrapper>
  );
};

export default QuizDoneBody;
