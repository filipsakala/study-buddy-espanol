import { DbVerb, DbWord, isDbWord } from "../../types/Exercise";
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
  question: DbWord | DbVerb,
  currentHelp: string | undefined,
  category: string | undefined
): string => {
  let helpWord = "";
  if (isDbWord(question)) {
    helpWord = question.es;
  } else {
    switch (category) {
      case "PARTICIPIO_PERFECTO":
        helpWord = question.infinitivo;
        break;
      case "PARTICIPIO_INDEFINIDO_1":
        helpWord = question.preterito_indefinido_1;
        break;
      case "PARTICIPIO_INDEFINIDO_2":
        helpWord = question.preterito_indefinido_2;
        break;
      case "PARTICIPIO_INDEFINIDO_3":
        helpWord = question.preterito_indefinido_3;
        break;
      case "PARTICIPIO_INDEFINIDO_4":
        helpWord = question.preterito_indefinido_4;
        break;
      case "PARTICIPIO_INDEFINIDO_5":
        helpWord = question.preterito_indefinido_5;
        break;
      case "PARTICIPIO_INDEFINIDO_6":
        helpWord = question.preterito_indefinido_6;
        break;
      default:
        throw new IncorrectCurrentHelpError(
          "Incorrect question category: " + category
        );
    }
  }

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
