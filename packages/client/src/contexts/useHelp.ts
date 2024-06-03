import { useCallback, useMemo, useState } from "react";
import { DbQuestion } from "../types/Question";

// Help for a word is an array of letters for the correct answer
// User can repeatedly ask for another random letter
const useHelp = (
  currentQuestion: DbQuestion,
  setCurrentQuestionScore: (
    isCorrectAnswer: boolean,
    withHelp: boolean
  ) => void,
  goToNextQuestion: () => void,
  getQuestionHelpApiCall: (
    id: number,
    current?: string
  ) => Promise<string | undefined>
) => {
  const [help, setHelp] = useState<string | undefined>();

  const resetHelp = useCallback(() => setHelp(undefined), []);

  const getQuestionHelp = useCallback(async () => {
    const helpWord = await getQuestionHelpApiCall(
      currentQuestion.questions[0].id,
      help
    );
    setHelp(helpWord);

    // if all indexes were filled, move to the next question
    const hasEmptyIndex = helpWord?.split("").some((char) => char !== "_");

    if (!hasEmptyIndex) {
      setCurrentQuestionScore(false, true);
      goToNextQuestion();
      resetHelp();
      return;
    }
  }, [help, currentQuestion]);

  return { resetHelp, help, getQuestionHelp };
};

export default useHelp;
