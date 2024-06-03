import { useCallback, useMemo, useState } from "react";
import { EQuizStatus } from "../types/Quiz";
import useQuizApi from "./useQuizApi";
import { QuizQuestion, DbQuestion } from "../types/Question";
import useHelp from "./useHelp";
import { TQuizContext } from "./QuizContextProvider";
import useCodetables from "./useCodetables";

const useQuizActions = (): TQuizContext => {
  const [quizStatus, setQuizStatus] = useState<EQuizStatus>(EQuizStatus.INIT);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
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
  const { codetables, filterLearnGroups, setFilterLearnGroups } =
    useCodetables(getCodetablesApiCall);

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex]
  );

  const setCurrentQuestionScore = useCallback(
    (questionIndex: number, isCorrectAnswer: boolean, withHelp: boolean) => {
      const questionScore = isCorrectAnswer ? (withHelp ? 1 : 2) : -1;
      setQuestions((prevState) => {
        // do not change negative score
        if (
          prevState[currentQuestionIndex].questions[questionIndex].score === -1
        ) {
          return prevState;
        }

        const nextState = [...prevState];
        nextState[currentQuestionIndex].questions[questionIndex].score =
          questionScore;
        return nextState;
      });
    },
    [currentQuestionIndex]
  );

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex + 1 >= questions.length) {
      setQuizStatus(EQuizStatus.DONE);
    }
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
    setCurrentAnswer([]);
  }, [currentQuestionIndex, questions]);

  const {
    resetHelp,
    help: currentQuestionHelp,
    getQuestionHelp,
  } = useHelp(
    currentQuestion,
    setCurrentQuestionScore,
    goToNextQuestion,
    getQuestionHelpApiCall
  );

  const startQuiz = useCallback(async () => {
    const apiQuestions: DbQuestion[] | undefined = await getQuestionsApiCall(
      filterLearnGroups
    );

    if (!apiQuestions) {
      return;
    }

    const quizQuestions: QuizQuestion[] = apiQuestions.map((q, index) => ({
      ...q,
      index,
      questions: q.questions.map((qq) => ({
        ...qq,
        correctAnswer: "",
        yourAnswer: "",
        score: 0,
      })),
    }));

    setQuestions(quizQuestions);
    setCurrentQuestionIndex(0);
    resetHelp();
    setCurrentAnswer([]);
    setQuizStatus(EQuizStatus.IN_PROGRESS);
  }, [filterLearnGroups]);

  const answerQuestion = useCallback(
    async (
      questionId: number,
      answer: string,
      questionIndex: number = 0
    ): Promise<boolean> => {
      if (quizStatus !== EQuizStatus.IN_PROGRESS || !answer) {
        return false;
      }

      const answerResult = await answerQuestionApiCall(
        questionId,
        answer,
        currentQuestion.category
      );

      if (answerResult === undefined) {
        return false;
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

      setQuestions((prev) => {
        const next = [...prev];
        const nextQuestions = [...next[currentQuestion.index].questions];
        // do not update already saved answer
        if (nextQuestions[questionIndex].yourAnswer) {
          return prev;
        }

        nextQuestions[questionIndex] = {
          ...nextQuestions[questionIndex],
          yourAnswer: answer,
          correctAnswer: correctAnswer as string,
        };

        next[currentQuestion.index] = {
          ...next[currentQuestion.index],
          questions: nextQuestions,
        };
        return next;
      });

      setCurrentQuestionScore(
        questionIndex,
        isCorrectAnswer,
        Boolean(currentQuestionHelp.length)
      );

      const answeredCount = currentAnswer.reduce((prev, a) => {
        if (a !== undefined) {
          return prev + 1;
        }
        return prev;
      }, 1);
      const isAnswered = currentQuestion.questions.length <= answeredCount;
      if (isAnswered) {
        resetHelp();
        setCurrentAnswer([]);
        goToNextQuestion();
      }

      return isCorrectAnswer;
    },
    [
      currentAnswer,
      quizStatus,
      currentQuestion,
      currentQuestionHelp,
      goToNextQuestion,
      resetHelp,
    ]
  );

  const playAnswerAudio = useCallback(
    async (questionId: number) => {
      const audioBase64 = await getAnswerSoundApiCall(questionId);

      let audio = new Audio("data:audio/wav;base64," + audioBase64);
      audio.play();
    },
    [getAnswerSoundApiCall]
  );

  return {
    isApiLoading,
    hasApiError,
    quizStatus,
    questions,
    currentQuestion,
    currentQuestionHelp,
    currentAnswer,
    codetables,
    filter: {
      learnGroups: filterLearnGroups || [],
    },

    startQuiz,
    answerQuestion,
    getQuestionHelp,
    playAnswerAudio,
    setCurrentAnswer,
    setFilterLearnGroups,
  };
};

export default useQuizActions;
