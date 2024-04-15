import getLearnGroups from "./getLearnGroups";

const getCodetables = async () => {
  const learnGroups = await getLearnGroups();

  return { learnGroups };
};

export default getCodetables;
