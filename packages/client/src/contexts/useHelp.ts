import { useCallback, useMemo, useState } from "react";
import { Question } from "../types/Question";

const produceSpacedArray = (word: string): string[] => {
  return [...Array(word.length)].map((_, i) => {
    // duplicate spaces between words
    if (word[i] === " ") {
      return " ";
    }
    return "";
  });
};

// Help for a word is an array of letters for the correct answer
// User can repeatedly ask for another random letter
const useHelp = (
  currentQuestion: Question,
  setCurrentQuestionScore: (
    isCorrectAnswer: boolean,
    withHelp: boolean
  ) => void,
  goToNextQuestion: () => void
) => {
  const [help, setHelp] = useState<string[]>([]);

  const resetHelp = useCallback(() => setHelp([]), []);

  const emptyIndexes = useMemo(() => {
    return help.reduce((prevIndexes: number[], currentHelp, currentIndex) => {
      const nextIndexes = [...prevIndexes];

      if (!currentHelp) {
        nextIndexes.push(currentIndex);
      }

      return nextIndexes;
    }, []);
  }, [help]);

  const getQuestionHelp = useCallback(() => {
    const correctAnswer = currentQuestion.correctAnswer;
    // just show number of letters for given answer
    if (!help.length) {
      setHelp(produceSpacedArray(correctAnswer as string));
      return;
    }
    // all indexes already filled, nothing to do
    if (emptyIndexes.length <= 1) {
      setCurrentQuestionScore(false, true);
      goToNextQuestion();
      resetHelp();
      return;
    }
    // get random index from the answer and set it as non-empty
    const randomIndexInRange = Math.floor(Math.random() * emptyIndexes.length);
    const randomEmptyIndex = emptyIndexes[randomIndexInRange];

    setHelp((prev) => {
      const next = [...prev];
      next[randomEmptyIndex] = correctAnswer[randomEmptyIndex];
      return next;
    });
  }, [help, currentQuestion, emptyIndexes]);

  return { resetHelp, help, getQuestionHelp };
};

export default useHelp;
