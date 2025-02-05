import { useMemo } from "react";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { styled } from "@mui/system";
import { useContextSelector } from "use-context-selector";
import QuizScore, { ScoreHeart } from "../QuizStatus/QuizScore";
import { IconButton, Typography } from "@mui/material";
import { ExerciseCategory } from "../../../types/Question";
import { RecordVoiceOver } from "@mui/icons-material";

const Wrapper = styled("div")`
  width: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const CorrectAnswers = styled("div")`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 15px;
`;

const CorrectAnswer = styled("div")`
  width: 25%;
  min-width: 400px;
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 5px;

  @media screen and (max-width: 599px) {
    min-width: 90%;
  }
`;

const FloatRight = styled("div")`
  float: right;
  padding: 5px;
  text-align: end;

  @media screen and (max-width: 599px) {
    float: initial;
    padding: initial;
    text-align: initial;
  }
`;

const formatAnswer = (answer: string, category: ExerciseCategory) => {
  if (category === ExerciseCategory.ARTICLES) {
    if (answer === "M") {
      return "♂️ el/los";
    } else {
      return "♀️ la/las";
    }
  }
  return answer;
};

const QuizDoneBody = () => {
  const status = useContextSelector(QuizContext, (c) => c.quizStatus);
  const exercises = useContextSelector(QuizContext, (c) => c.exercises);
  const playAnswerAudio = useContextSelector(
    QuizContext,
    (c) => c.playAnswerAudio
  );

  const correctAnswerCount = useMemo(() => {
    return exercises.reduce((prev, exercise) => {
      const increment = exercise.questions.reduce((prev, { score }) => {
        if (score > 0) {
          return prev + 1;
        }
        return prev;
      }, 0);

      return prev + increment;
    }, 0);
  }, [exercises]);

  const questionsCount = useMemo(() => {
    return exercises.reduce(
      (prev, exercise) => prev + exercise.questions.length,
      0
    );
  }, [exercises]);

  if (status !== EQuizStatus.DONE) {
    return null;
  }

  return (
    <Wrapper>
      <h2>
        Your score is {correctAnswerCount} out of {questionsCount}
      </h2>
      <QuizScore />
      <CorrectAnswers>
        {exercises.map(({ questions, category, index }) =>
          questions.map((question) => (
            <CorrectAnswer key={question.id}>
              <Typography variant="h6">
                {question.textEn}
                <IconButton onClick={() => playAnswerAudio(question.id)}>
                  <RecordVoiceOver />
                </IconButton>
                <FloatRight>
                  <Typography variant="body2">
                    Excersise {index + 1}:{" "}
                    {category === ExerciseCategory.TRANSLATE_WORD &&
                      "Translate word"}
                    {category === ExerciseCategory.WORDS_MATCH && "Match words"}
                    {category === ExerciseCategory.ARTICLES &&
                      "Select articles"}
                    {category === ExerciseCategory.PRETERITO_PERFECTO &&
                      "Pretérito perfecto"}
                    {category === ExerciseCategory.PRETERITO_INDEFINIDO &&
                      "Pretérito indefinido"}
                  </Typography>
                  <ScoreHeart score={question.score} />
                </FloatRight>
              </Typography>

              {question.score > 0 && (
                <Typography variant="body2">
                  {formatAnswer(question.correctAnswer, category)}
                </Typography>
              )}
              {question.score <= 0 && (
                <Typography variant="body2">
                  Your answer: {formatAnswer(question.yourAnswer, category)},
                  Correct: {formatAnswer(question.correctAnswer, category)}
                </Typography>
              )}
            </CorrectAnswer>
          ))
        )}
      </CorrectAnswers>
    </Wrapper>
  );
};

export default QuizDoneBody;
