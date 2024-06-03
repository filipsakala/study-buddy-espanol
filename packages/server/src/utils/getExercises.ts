import { Exercise, ExerciseCategory } from "../../types/Exercise";
import getArticlesQuestions from "./getArticlesExercises";
import getTranslateWordQuestions from "./getTranslateWordExercises";
import getWordsMatchQuestions from "./getWordsMatchExercises";

const TRANSLATE_WORD_EXERCISE_PROBABILITY = 0.7;
const ARTICLES_EXERCISE_PROBABILITY = 0.1;

const pickRandomCategory = (): ExerciseCategory => {
  const randomNumber = Math.random();

  if (randomNumber < TRANSLATE_WORD_EXERCISE_PROBABILITY) {
    return "TRANSLATE_WORD";
  }
  if (
    randomNumber <
    TRANSLATE_WORD_EXERCISE_PROBABILITY + ARTICLES_EXERCISE_PROBABILITY
  ) {
    return "ARTICLES";
  }
  return "WORDS_MATCH";
};

const getExerciseCategories = (count: number) => {
  const categoryCounts = { TRANSLATE_WORD: 0, WORDS_MATCH: 0, ARTICLES: 0 };

  const exerciseCategories = [...Array(count)].map((_) => {
    const randomCategory = pickRandomCategory();
    categoryCounts[randomCategory] = categoryCounts[randomCategory] + 1;
    return randomCategory;
  });

  return { exerciseCategories, categoryCounts };
};

const getQuestions = async (
  count: number,
  learnGroup?: string | string[]
): Promise<Exercise[]> => {
  const { exerciseCategories, categoryCounts } = getExerciseCategories(count);

  const translateWordExercises: Exercise[] = await getTranslateWordQuestions(
    categoryCounts.TRANSLATE_WORD,
    learnGroup
  );
  const articlesExercises: Exercise[] = await getArticlesQuestions(
    categoryCounts.ARTICLES,
    learnGroup
  );
  const wordMatchExercises: Exercise[] = await getWordsMatchQuestions(
    categoryCounts.WORDS_MATCH,
    learnGroup
  );

  // shuffle exercises according to given order
  let translateWordIndex = 0;
  let articlesIndex = 0;
  let wordMatchIndex = 0;
  return exerciseCategories.map((category) => {
    if (category === "TRANSLATE_WORD") {
      return translateWordExercises[translateWordIndex++];
    }
    if (category === "ARTICLES") {
      return articlesExercises[articlesIndex++];
    }
    // WORD_MATCH
    return wordMatchExercises[wordMatchIndex++];
  });
};

export default getQuestions;
