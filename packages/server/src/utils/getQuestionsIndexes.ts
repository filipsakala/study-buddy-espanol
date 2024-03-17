const getQuestionsIndexes = (
  count: number,
  dbQuestionCount: number
): number[] => {
  const countToGet = Math.min(count, dbQuestionCount);
  const questionIndexes = new Set<number>();

  while (questionIndexes.size < countToGet) {
    const randomIndex = Math.floor(Math.random() * dbQuestionCount);
    questionIndexes.add(randomIndex);
  }

  return [...questionIndexes];
};

export default getQuestionsIndexes;
