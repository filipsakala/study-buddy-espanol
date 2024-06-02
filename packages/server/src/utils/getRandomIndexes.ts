const getRandomIndexes = (count: number): number[] => {
  const questionIndexes = new Set<number>();

  while (questionIndexes.size < count) {
    const randomIndex = Math.floor(Math.random() * count);
    questionIndexes.add(randomIndex);
  }

  return [...questionIndexes];
};

export default getRandomIndexes;
