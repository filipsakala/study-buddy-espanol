import db from "../../db";

const getCourses = async () => {
  const courses = await db.manyOrNone("SELECT DISTINCT course FROM words");
  return courses.map(({ course }) => course);
};

export default getCourses;
