import { useCallback, useState } from "react";
import { DbExercise } from "../types/Question";

// Help for a word is an array of letters for the correct answer
// User can repeatedly ask for another random letter
const useHelp = (
  currentExercise: DbExercise,
  setCurrentQuestionScore: (
    questionIndex: number,
    isCorrectAnswer: boolean,
    withHelp: boolean
  ) => void,
  goToNextQuestion: () => void,
  getQuestionHelpApiCall: (
    id: string,
    current?: string
  ) => Promise<string | undefined>
) => {
  const [help, setHelp] = useState<string>("");

  const resetHelp = useCallback(() => setHelp(""), []);

  const getQuestionHelp = useCallback(async () => {
    const helpWord = await getQuestionHelpApiCall(
      currentExercise.questions[0].id,
      help.length ? help : undefined
    );

    // if all indexes were filled, move to the next question
    const hasEmptyIndex = helpWord?.split("").some((char) => char === "_");

    if (!hasEmptyIndex) {
      setCurrentQuestionScore(0, false, true);
      goToNextQuestion();
      resetHelp();
      return;
    }

    setHelp(helpWord || "");
  }, [
    help,
    getQuestionHelpApiCall,
    currentExercise,
    goToNextQuestion,
    setCurrentQuestionScore,
    resetHelp,
  ]);

  return { resetHelp, help, getQuestionHelp };
};

export default useHelp;
