import { useMemo } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { Favorite, HeartBroken, RecordVoiceOver } from "@mui/icons-material";
import { styled } from "@mui/system";
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
  width: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
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

const ScoreHeart = ({ score, style }: { score: number; style?: Object }) => {
  if (score > 1) return <StyledFavorite color="error" style={style} />;
  else if (score === 1) return <StyledFavorite color="warning" style={style} />;
  else return <HeartBroken color="error" style={style} />;
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

      <Table
        size="small"
        style={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell>Your answer</TableCell>
            <TableCell>Correct</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((question, i) => {
            const isTranslateWord =
              question.category === QuestionCategory.TRANSLATE_WORD;
            const isArticles = question.category === QuestionCategory.ARTICLES;
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

            const questionText = isTranslateWord ? question.question : "";
            const answerText = isTranslateWord
              ? question.answer
              : isArticles
              ? (question.answer as string[])
                  .map(
                    (answer, index) => `${question.question[index]} (${answer})`
                  )
                  .join(", \r\n")
              : (question.answer as number[][])
                  .map(
                    ([q, a]) => `${questionTextsById[q]}:${answerTextsById[a]}`
                  )
                  .join(", \r\n");
            const correctAnswerText = isTranslateWord
              ? question.correctAnswer
              : isArticles
              ? (question.gender as string[]).join(", \r\n")
              : (question.correctAnswer as string[]).join(", \r\n");

            return (
              <TableRow key={i}>
                <TableCell>
                  <ScoreHeart
                    score={question.score}
                    style={{ verticalAlign: "bottom" }}
                  />{" "}
                  {questionText}
                </TableCell>
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
