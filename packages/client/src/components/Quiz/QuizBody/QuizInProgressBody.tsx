import { QuizContext } from "../../../contexts/QuizContextProvider";
import { EQuizStatus } from "../../../types/Quiz";
import { ExerciseCategory } from "../../../types/Question";
import TranslateWordExercise from "../Exercise/TranslateWordExercise";
import WordMatchExercise from "../Exercise/WordMatchExercise";
import { useContextSelector } from "use-context-selector";
import ArticlesExercise from "../Exercise/ArticlesExercise";
import PreteritoPerfectoExercise from "../Exercise/PreteritoPerfectoExercise";
import PreteritoIndefinidoExercise from "../Exercise/PreteritoIndefinidoExercise";

const QuizInProgressBody = () => {
  const status = useContextSelector(QuizContext, (c) => c.quizStatus);
  const currentExercise = useContextSelector(
    QuizContext,
    (c) => c.currentExercise
  );

  if (status !== EQuizStatus.IN_PROGRESS || !currentExercise) {
    return null;
  }

  return (
    <>
      {currentExercise.category === ExerciseCategory.TRANSLATE_WORD && (
        <TranslateWordExercise />
      )}
      {currentExercise.category === ExerciseCategory.WORDS_MATCH && (
        <WordMatchExercise />
      )}
      {currentExercise.category === ExerciseCategory.ARTICLES && (
        <ArticlesExercise />
      )}
      {currentExercise.category === ExerciseCategory.PRETERITO_PERFECTO && (
        <PreteritoPerfectoExercise />
      )}
      {currentExercise.category === ExerciseCategory.PRETERITO_INDEFINIDO && (
        <PreteritoIndefinidoExercise />
      )}
    </>
  );
};

export default QuizInProgressBody;
