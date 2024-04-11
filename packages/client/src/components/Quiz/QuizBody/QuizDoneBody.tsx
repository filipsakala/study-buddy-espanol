import { useMemo } from "react";
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
import { QuestionCategory } from "../../../types/Question";
import { useContextSelector } from "use-context-selector";

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
  const status = useContextSelector(QuizContext, (c) => c.quizStatus);
  const questions = useContextSelector(QuizContext, (c) => c.questions);
  const playAnswerAudio = useContextSelector(
    QuizContext,
    (c) => c.playAnswerAudio
  );

  const correctAnswerCount = useMemo(() => {
    return questions.reduce((prev, current) => {
      let newScore = prev;
      if (current.score > 0) {
        newScore = prev + 1;
      }
      return newScore;
    }, 0);
  }, [questions]);

  if (status !== EQuizStatus.DONE) {
    return null;
  }

  return (
    <Wrapper>
      <h2>
        Your score is {correctAnswerCount} out of {questions.length}
      </h2>
      <StyledImg src={studyBuddy} alt="Study buddy img" />

      <Table
        size="small"
        style={{
          maxWidth: "95vw",
          display: "block",
          overflowX: "auto",
          whiteSpace: "pre",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Excersise</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Your answer</TableCell>
            <TableCell>Correct</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((question, i) => {
            const isTranslateWord =
              question.category === QuestionCategory.TRANSLATE_WORD;
            const questionTextsById = isTranslateWord
              ? {}
              : (question.question as string[]).reduce(
                  (prev: Record<number, string>, text, i) => {
                    const questionId = (question.id as number[])[i];
                    prev[questionId] = text;
                    return prev;
                  },
                  {}
                );
            const answerTextsById = isTranslateWord
              ? {}
              : (question.correctAnswer as string[]).reduce(
                  (prev: Record<number, string>, text, i) => {
                    const questionId = (question.id as number[])[i];
                    prev[questionId] = text;
                    return prev;
                  },
                  {}
                );

            const questionText = isTranslateWord
              ? question.question
              : (question.question as string[]).join(", \r\n");
            const answerText = isTranslateWord
              ? question.answer
              : (question.answer as number[][])
                  .map(
                    ([q, a]) => `${questionTextsById[q]}:${answerTextsById[a]}`
                  )
                  .join(", \r\n");
            const correctAnswerText = isTranslateWord
              ? question.correctAnswer
              : (question.correctAnswer as string[]).join(", \r\n");

            return (
              <TableRow key={i}>
                <TableCell>
                  <ScoreHeart score={question.score} />
                </TableCell>
                <TableCell>{questionText}</TableCell>
                <TableCell>{answerText}</TableCell>
                <TableCell>
                  {correctAnswerText}
                  {isTranslateWord && (
                    <IconButton
                      onClick={() => playAnswerAudio(question.id as number)}
                    >
                      <RecordVoiceOver />
                    </IconButton>
                  )}
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
