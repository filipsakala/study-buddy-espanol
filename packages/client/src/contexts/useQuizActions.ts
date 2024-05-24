import { useCallback, useEffect, useMemo, useState } from "react";
import { EQuizStatus } from "../types/Quiz";
import useQuizApi from "./useQuizApi";
import { QuizQuestion, DbQuestion, QuestionCategory } from "../types/Question";
import useHelp from "./useHelp";
import { TQuizContext } from "./QuizContextProvider";
import { Codetables } from "../types/Codetables";

const useQuizActions = (): TQuizContext => {
  const {
    isApiLoading,
    hasApiError,
    getQuestionsApiCall,
    answerQuestionApiCall,
    getAnswerSoundApiCall,
    getCodetablesApiCall,
  } = useQuizApi();
  const [quizStatus, setQuizStatus] = useState<EQuizStatus>(EQuizStatus.INIT);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentAnswer, setCurrentAnswer] = useState<string | number[][]>("");
  const [filterLearnGroups, setFilterLearnGroups] = useState<
    string[] | undefined
  >();
  const [codetables, setCodetables] = useState<Codetables | undefined>();

  useEffect(() => {
    getCodetablesApiCall().then((data) => setCodetables(data));
  }, []);

  useEffect(() => {
    const storedFilters = localStorage.getItem("filters");

    if (storedFilters) {
      setFilterLearnGroups(JSON.parse(storedFilters));
    }
  }, []);

  useEffect(() => {
    if (filterLearnGroups !== undefined) {
      localStorage.setItem("filters", JSON.stringify(filterLearnGroups));
    }
  }, [filterLearnGroups]);

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex]
  );

  const setCurrentQuestionScore = useCallback(
    (isCorrectAnswer: boolean, withHelp: boolean) => {
      const questionScore = isCorrectAnswer ? (withHelp ? 1 : 2) : -1;
      setQuestions((prevState) => {
        const nextState = [...prevState];
        nextState[currentQuestionIndex].score = questionScore;
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
    setCurrentAnswer("");
  }, [currentQuestionIndex, questions]);

  const {
    resetHelp,
    help: currentQuestionHelp,
    getQuestionHelp,
  } = useHelp(currentQuestion, setCurrentQuestionScore, goToNextQuestion);

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
      score: 0,
      answer: q.category === QuestionCategory.TRANSLATE_WORD ? "" : [],
    }));

    setQuestions(quizQuestions);
    setCurrentQuestionIndex(0);
    resetHelp();
    setQuizStatus(EQuizStatus.IN_PROGRESS);
    setCurrentAnswer("");
  }, [filterLearnGroups]);

  const answerTranslateWordQuestion = useCallback(async () => {
    setQuestions((prev) => {
      const next = [...prev];
      next[currentQuestion.index].answer = currentAnswer;
      return next;
    });
    const isCorrectAnswer = await answerQuestionApiCall(
      currentQuestion.id as number,
      currentAnswer as string
    );

    if (isCorrectAnswer === undefined) {
      return;
    }

    setCurrentQuestionScore(
      isCorrectAnswer,
      Boolean(currentQuestionHelp.length)
    );
    goToNextQuestion();
    resetHelp();
  }, [
    currentAnswer,
    currentQuestion,
    goToNextQuestion,
    currentQuestionHelp,
    resetHelp,
    setCurrentQuestionScore,
  ]);

  const answerWordMatchQuestion = useCallback(() => {
    const wordCount = currentQuestion.question.length;
    const correctMatches = (currentAnswer as number[][]).reduce(
      (prev, answer) => {
        if (answer[0] === answer[1]) {
          return prev + 1;
        }
        return prev;
      },
      0
    );

    const isCorrect = wordCount === currentAnswer.length; // only correct matches
    // all matches completed
    if (wordCount === correctMatches) {
      setQuestions((prev) => {
        const next = [...prev];
        next[currentQuestion.index].answer = currentAnswer;
        return next;
      });
      setCurrentQuestionScore(isCorrect, false);
      goToNextQuestion();
    }
  }, [
    currentAnswer,
    currentQuestion,
    goToNextQuestion,
    setCurrentQuestionScore,
  ]);

  const answerQuestion = useCallback(() => {
    if (quizStatus !== EQuizStatus.IN_PROGRESS || !currentAnswer) {
      return;
    }

    if (currentQuestion.category === QuestionCategory.TRANSLATE_WORD) {
      return answerTranslateWordQuestion();
    }
    if (currentQuestion.category === QuestionCategory.WORDS_MATCH) {
      return answerWordMatchQuestion();
    }
  }, [
    currentAnswer,
    quizStatus,
    currentQuestion,
    answerTranslateWordQuestion,
    answerWordMatchQuestion,
  ]);

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
