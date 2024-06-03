import { useCallback, useState } from "react";
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
  const [help, setHelp] = useState<string>("");

  const resetHelp = useCallback(() => setHelp(""), []);

  const getQuestionHelp = useCallback(async () => {
    const helpWord = await getQuestionHelpApiCall(
      currentQuestion.questions[0].id,
      help.length ? help : undefined
    );

    // if all indexes were filled, move to the next question
    const hasEmptyIndex = helpWord?.split("").some((char) => char === "_");

    if (!hasEmptyIndex) {
      setCurrentQuestionScore(false, true);
      goToNextQuestion();
      resetHelp();
      return;
    }

    setHelp(helpWord || "");
  }, [
    help,
    getQuestionHelpApiCall,
    currentQuestion,
    goToNextQuestion,
    setCurrentQuestionScore,
    resetHelp,
  ]);

  return { resetHelp, help, getQuestionHelp };
};

export default useHelp;
