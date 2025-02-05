import { useCallback, useMemo, useState } from "react";
import { EQuizStatus } from "../types/Quiz";
import useQuizApi from "./useQuizApi";
import { QuizExercise, DbExercise, ExerciseCategory } from "../types/Question";
import useHelp from "./useHelp";
import { TQuizContext } from "./QuizContextProvider";
import useCodetables from "./useCodetables";

const useQuizActions = (): TQuizContext => {
  const [quizStatus, setQuizStatus] = useState<EQuizStatus>(EQuizStatus.INIT);
  const [exercises, setExercises] = useState<QuizExercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [currentAnswer, setCurrentAnswer] = useState<string[]>([]);

  const {
    isApiLoading,
    hasApiError,
    getQuestionsApiCall,
    getQuestionHelpApiCall,
    answerQuestionApiCall,
    getAnswerSoundApiCall,
    getCodetablesApiCall,
  } = useQuizApi();
  const {
    codetables,
    filterLearnGroups,
    setFilterLearnGroups,
    filterCourses,
    setFilterCourses,
  } = useCodetables(getCodetablesApiCall);

  const currentExercise = useMemo(
    () => exercises[currentExerciseIndex],
    [exercises, currentExerciseIndex]
  );

  const setCurrentQuestionScore = useCallback(
    (questionIndex: number, isCorrectAnswer: boolean, withHelp: boolean) => {
      const questionScore = isCorrectAnswer ? (withHelp ? 1 : 2) : -1;
      setExercises((prevState) => {
        // do not change negative score
        if (
          prevState[currentExerciseIndex].questions[questionIndex].score === -1
        ) {
          return prevState;
        }

        const nextState = [...prevState];
        nextState[currentExerciseIndex].questions[questionIndex].score =
          questionScore;
        return nextState;
      });
    },
    [currentExerciseIndex]
  );

  const goToNextQuestion = useCallback(() => {
    if (currentExerciseIndex + 1 >= exercises.length) {
      setQuizStatus(EQuizStatus.DONE);
    }
    setCurrentExerciseIndex((prev) => Math.min(prev + 1, exercises.length - 1));
    setCurrentAnswer([]);
  }, [currentExerciseIndex, exercises]);

  const {
    resetHelp,
    help: currentQuestionHelp,
    getQuestionHelp,
  } = useHelp(
    currentExercise,
    setCurrentQuestionScore,
    goToNextQuestion,
    getQuestionHelpApiCall
  );

  const startQuiz = useCallback(async () => {
    const apiExercises: DbExercise[] | undefined = await getQuestionsApiCall(
      filterLearnGroups,
      filterCourses
    );

    if (!apiExercises) {
      return;
    }

    const quizExercises: QuizExercise[] = apiExercises.map((q, index) => ({
      ...q,
      index,
      questions: q.questions.map((qq) => ({
        ...qq,
        correctAnswer: "",
        yourAnswer: "",
        score: 0,
      })),
    }));

    setExercises(quizExercises);
    setCurrentExerciseIndex(0);
    resetHelp();
    setCurrentAnswer([]);
    setQuizStatus(EQuizStatus.IN_PROGRESS);
  }, [filterLearnGroups, filterCourses, getQuestionsApiCall, resetHelp]);

  const answerQuestion = useCallback(
    async (
      questionId: string,
      answer: string,
      questionIndex: number = 0
    ): Promise<{ result: boolean; correctAnswer?: string } | undefined> => {
      if (quizStatus !== EQuizStatus.IN_PROGRESS || !answer) {
        return { result: false };
      }

      const answerResult = await answerQuestionApiCall(
        questionId,
        answer,
        currentExercise.category,
        currentExercise.category === ExerciseCategory.PRETERITO_INDEFINIDO
          ? currentExercise.questions[questionIndex].randomizedAnswer
          : undefined
      );

      if (answerResult === undefined) {
        return { result: false };
      }

      const { result: isCorrectAnswer, correctAnswer } = answerResult;
      if (isCorrectAnswer) {
        // to keep track of correct pairs in word matches
        setCurrentAnswer((prev) => {
          const next = [...prev];
          next[questionIndex] = answer;
          return next;
        });
      }

      setExercises((prev) => {
        const next = [...prev];
        const nextQuestions = [...next[currentExercise.index].questions];
        // do not update already saved answer
        if (nextQuestions[questionIndex].yourAnswer) {
          return prev;
        }

        nextQuestions[questionIndex] = {
          ...nextQuestions[questionIndex],
          yourAnswer: answer,
          correctAnswer: correctAnswer as string,
        };

        next[currentExercise.index] = {
          ...next[currentExercise.index],
          questions: nextQuestions,
        };
        return next;
      });

      setCurrentQuestionScore(
        questionIndex,
        isCorrectAnswer,
        Boolean(currentQuestionHelp.length)
      );

      const answeredCount = currentAnswer.reduce(
        (prev, a) => {
          if (a !== undefined) {
            return prev + 1;
          }
          return prev;
        },
        currentExercise.category === ExerciseCategory.ARTICLES ||
          currentExercise.category === ExerciseCategory.WORDS_MATCH
          ? 1
          : 0
      );
      const isAnswered = currentExercise.questions.length <= answeredCount;

      if (isAnswered) {
        resetHelp();
        setCurrentAnswer([]);
        goToNextQuestion();
      }

      return answerResult;
    },
    [
      currentAnswer,
      quizStatus,
      currentExercise,
      currentQuestionHelp,
      goToNextQuestion,
      resetHelp,
      answerQuestionApiCall,
      setCurrentQuestionScore,
    ]
  );

  const playAnswerAudio = useCallback(
    async (questionId: string) => {
      const audioBase64 = await getAnswerSoundApiCall(questionId);

      const audio = new Audio("data:audio/wav;base64," + audioBase64);
      audio.play();
    },
    [getAnswerSoundApiCall]
  );

  return {
    isApiLoading,
    hasApiError,
    quizStatus,
    exercises,
    currentExercise,
    currentQuestionHelp,
    currentAnswer,
    codetables,
    filter: {
      courses: filterCourses || [],
      learnGroups: filterLearnGroups || [],
    },

    startQuiz,
    answerQuestion,
    getQuestionHelp,
    playAnswerAudio,
    setCurrentAnswer,
    setFilterLearnGroups,
    setFilterCourses,
  };
};

export default useQuizActions;
