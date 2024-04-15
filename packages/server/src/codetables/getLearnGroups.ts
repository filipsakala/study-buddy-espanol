import db from "../../db";

const getLearnGroups = async () => {
  const learnGroups = await db.manyOrNone(
    "SELECT DISTINCT learn_group FROM words"
  );
  return learnGroups.map(({ learn_group }) => learn_group);
};

export default getLearnGroups;
