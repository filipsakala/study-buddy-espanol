import { Button, styled } from "@mui/material";
import { Question } from "../../../types/Question";
import { useCallback, useEffect, useMemo, useState } from "react";
import getRandomIndexes from "../../../utils/getRandomIndexes";
import { QuizContext } from "../../../contexts/QuizContextProvider";
import { useContextSelector } from "use-context-selector";

type Props = {
  question: Question;
};

type WordGroups = {
  questions: { id: number; question: string }[];
  answers: { id: number; answer: string }[];
};

const MatchColumns = styled("div")`
  display: flex;
  gap: 1.5em;
`;

const MatchColumn = styled("div")`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.5em;
`;

const StyledButton = styled(Button)`
  display: inline-block;
  text-transform: lowercase;
  height: 4.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: unset;
`;

const WordMatchQuestion = ({ question }: Props) => {
  const currentAnswer = useContextSelector(QuizContext, (c) => c.currentAnswer);
  const setCurrentAnswer = useContextSelector(
    QuizContext,
    (c) => c.setCurrentAnswer
  );
  const answerQuestion = useContextSelector(
    QuizContext,
    (c) => c.answerQuestion
  );

  const [selectedQuestionId, setSelectedQuestionId] = useState<
    number | undefined
  >();
  const [selectedAnswerId, setSelectedAnswerId] = useState<
    number | undefined
  >();

  const wordGroups: WordGroups = useMemo(() => {
    const groups: WordGroups = { questions: [], answers: [] };

    // copy english ones in the first column
    groups.questions = (question.id as number[]).map((id, i) => ({
      id,
      question: question.question[i],
    }));
    // randomize second column
    const indexes = getRandomIndexes(question.question.length);
    groups.answers = indexes.map((i) => ({
      id: (question.id as number[])[i],
      answer: question.correctAnswer[i],
    }));
    return groups;
  }, [question]);

  const selectQuestion = useCallback(
    (id: number) => {
      // unselect selected
      if (selectedQuestionId === id) {
        setSelectedQuestionId(undefined);
        return;
      }

      setSelectedQuestionId(id);
      if (selectedAnswerId) {
        setCurrentAnswer([
          ...(currentAnswer as number[][]),
          [id, selectedAnswerId],
        ]);
      }
    },
    [selectedQuestionId, selectedAnswerId]
  );

  const selectAnswer = useCallback(
    (id: number) => {
      // unselect selected
      if (selectedAnswerId === id) {
        setSelectedAnswerId(undefined);
        return;
      }

      setSelectedAnswerId(id);
      if (selectedQuestionId) {
        setCurrentAnswer([
          ...(currentAnswer as number[][]),
          [selectedQuestionId, id],
        ]);
      }
    },
    [selectedQuestionId, selectedAnswerId]
  );

  useEffect(() => {
    if (selectedQuestionId && selectedAnswerId) {
      setSelectedQuestionId(undefined);
      setSelectedAnswerId(undefined);
      answerQuestion();
    }
  }, [currentAnswer, selectedQuestionId, selectedAnswerId, answerQuestion]);

  const getButtonVariant = useCallback(
    (isQuestion: boolean, questionId: number): "outlined" | "contained" => {
      const isSelected = isQuestion
        ? selectedQuestionId === questionId
        : selectedAnswerId === questionId;

      if (isSelected) {
        return "contained";
      }
      return "outlined";
    },
    [selectedQuestionId, selectedAnswerId]
  );

  // Button is disabled only when it's answered correctly
  const getDisabledState = useCallback(
    (questionId: number): boolean => {
      return (currentAnswer as number[][]).some(
        ([qId, aId]) => qId === aId && qId === questionId
      );
    },
    [currentAnswer]
  );

  return (
    <MatchColumns>
      <MatchColumn>
        {wordGroups.questions.map(({ id, question }) => {
          return (
            <StyledButton
              key={id}
              variant={getButtonVariant(true, id)}
              size="large"
              onClick={() => selectQuestion(id)}
              disabled={getDisabledState(id)}
            >
              {question}
            </StyledButton>
          );
        })}
      </MatchColumn>
      <MatchColumn>
        {wordGroups.answers.map(({ id, answer }) => {
          return (
            <StyledButton
              key={id}
              variant={getButtonVariant(false, id)}
              size="large"
              onClick={() => selectAnswer(id)}
              disabled={getDisabledState(id)}
            >
              {answer}
            </StyledButton>
          );
        })}
      </MatchColumn>
    </MatchColumns>
  );
};

export default WordMatchQuestion;
