import { DbWord } from "../../types/Question";
import { IncorrectCurrentHelpError } from "../errors";

const checkCurrentHelp = (helpWord: string, currentHelp: string): boolean => {
  if (helpWord === currentHelp || helpWord.length !== currentHelp.length) {
    return false;
  }

  return helpWord
    .split("")
    .every(
      (char, index) => currentHelp[index] === "_" || char === currentHelp[index]
    );
};

const produceEmptyHelpWord = (word: string): string => {
  return word
    .split("")
    .map((_, i) => {
      // duplicate spaces between words
      if (word[i] === " ") {
        return " ";
      }
      return "_";
    })
    .join("");
};

const getEmptyIndexes = (currentHelp: string) => {
  return currentHelp
    .split("")
    .reduce((prevIndexes: number[], char, currentIndex) => {
      const nextIndexes = [...prevIndexes];

      if (char === "_") {
        nextIndexes.push(currentIndex);
      }

      return nextIndexes;
    }, []);
};

const getQuestionHelp = (
  question: DbWord,
  currentHelp: string | undefined
): string => {
  const helpWord = question.es;

  if (currentHelp === undefined) {
    return produceEmptyHelpWord(helpWord);
  }

  if (!checkCurrentHelp(helpWord, currentHelp)) {
    throw new IncorrectCurrentHelpError(
      "Incorrect current help word: " + currentHelp
    );
  }

  const emptyIndexes = getEmptyIndexes(currentHelp);
  const randomIndexInRange = Math.floor(Math.random() * emptyIndexes.length);
  const randomEmptyIndex = emptyIndexes[randomIndexInRange];
  const nextHelp = currentHelp.split("");
  nextHelp[randomEmptyIndex] = helpWord[randomEmptyIndex];

  return nextHelp.join("");
};

export default getQuestionHelp;
