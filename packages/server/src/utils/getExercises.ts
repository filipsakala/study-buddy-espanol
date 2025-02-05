import { Exercise, ExerciseCategory } from "../../types/Exercise";
import getArticlesQuestions from "./getArticlesExercises";
import getPreteritoIndefinidoQuestions from "./getPreteritoIndefinidoQuestions";
import getPreteritoPerfectoQuestions from "./getPreteritoPerfectoQuestions";
import getTranslateWordQuestions from "./getTranslateWordExercises";
import getWordsMatchQuestions from "./getWordsMatchExercises";

const TRANSLATE_WORD_EXERCISE_PROBABILITY = 0.5;
const ARTICLES_EXERCISE_PROBABILITY = 0.1;
const PRETERITO_PERFECTO_EXERCISE_PROBABILITY = 0.1;
const PRETERITO_INDEFINIDO_EXERCISE_PROBABILITY = 0.1;

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
  if (
    randomNumber <
    TRANSLATE_WORD_EXERCISE_PROBABILITY +
      ARTICLES_EXERCISE_PROBABILITY +
      PRETERITO_PERFECTO_EXERCISE_PROBABILITY
  ) {
    return "PRETERITO_PERFECTO";
  }
  if (
    randomNumber <
    TRANSLATE_WORD_EXERCISE_PROBABILITY +
      ARTICLES_EXERCISE_PROBABILITY +
      PRETERITO_PERFECTO_EXERCISE_PROBABILITY +
      PRETERITO_INDEFINIDO_EXERCISE_PROBABILITY
  ) {
    return "PRETERITO_INDEFINIDO";
  }
  return "WORDS_MATCH";
};

const getExerciseCategories = (count: number) => {
  const categoryCounts = {
    TRANSLATE_WORD: 0,
    WORDS_MATCH: 0,
    ARTICLES: 0,
    PRETERITO_PERFECTO: 0,
    PRETERITO_INDEFINIDO: 0,
  };

  const exerciseCategories = [...Array(count)].map((_) => {
    const randomCategory = pickRandomCategory();
    categoryCounts[randomCategory] = categoryCounts[randomCategory] + 1;
    return randomCategory;
  });

  return { exerciseCategories, categoryCounts };
};

const getExercises = async (
  count: number,
  learnGroup?: string | string[],
  course?: string
): Promise<Exercise[]> => {
  const { exerciseCategories, categoryCounts } = getExerciseCategories(count);

  const translateWordExercises: Exercise[] = await getTranslateWordQuestions(
    categoryCounts.TRANSLATE_WORD,
    learnGroup,
    course
  );
  const articlesExercises: Exercise[] = await getArticlesQuestions(
    categoryCounts.ARTICLES,
    learnGroup,
    course
  );
  const wordMatchExercises: Exercise[] = await getWordsMatchQuestions(
    categoryCounts.WORDS_MATCH,
    learnGroup,
    course
  );
  const preteritoPerfectoExercises: Exercise[] =
    await getPreteritoPerfectoQuestions(categoryCounts.PRETERITO_PERFECTO);
  const preteritoIndefinidoExercises: Exercise[] =
    await getPreteritoIndefinidoQuestions(categoryCounts.PRETERITO_INDEFINIDO);

  // shuffle exercises according to given order
  let translateWordIndex = 0;
  let articlesIndex = 0;
  let wordMatchIndex = 0;
  let preteritoPerfectoIndex = 0;
  let preteritoIndefinidoIndex = 0;
  return exerciseCategories.map((category) => {
    if (category === "TRANSLATE_WORD") {
      return translateWordExercises[translateWordIndex++];
    }
    if (category === "ARTICLES") {
      return articlesExercises[articlesIndex++];
    }
    if (category === "PRETERITO_PERFECTO") {
      return preteritoPerfectoExercises[preteritoPerfectoIndex++];
    }
    if (category === "PRETERITO_INDEFINIDO") {
      return preteritoIndefinidoExercises[preteritoIndefinidoIndex++];
    }
    // WORD_MATCH
    return wordMatchExercises[wordMatchIndex++];
  });
};

export default getExercises;
