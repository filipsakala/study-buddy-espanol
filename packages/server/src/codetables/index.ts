import getCourses from "./getCourses";
import getLearnGroups from "./getLearnGroups";

const getCodetables = async () => {
  const learnGroups = await getLearnGroups();
  const courses = await getCourses();

  return { courses, learnGroups };
};

export default getCodetables;
