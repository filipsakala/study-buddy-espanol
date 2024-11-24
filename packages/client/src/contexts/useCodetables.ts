import { useEffect, useState } from "react";
import { Codetables } from "../types/Codetables";

const useCodetables = (
  getCodetablesApiCall: () => Promise<Codetables | undefined>
) => {
  const [codetables, setCodetables] = useState<Codetables | undefined>();
  const [filterCourses, setFilterCourses] = useState<string[] | undefined>();
  const [filterLearnGroups, setFilterLearnGroups] = useState<
    string[] | undefined
  >();

  useEffect(() => {
    getCodetablesApiCall().then((data) => setCodetables(data));
  }, []);

  // get filters from local storage to the context
  useEffect(() => {
    const storedFilters = localStorage.getItem("filters");

    if (storedFilters) {
      setFilterLearnGroups(JSON.parse(storedFilters));
    }
  }, []);

  // get filters from local storage to the context
  useEffect(() => {
    const storedFilters = localStorage.getItem("filters-courses");

    if (storedFilters) {
      setFilterCourses(JSON.parse(storedFilters));
    }
  }, []);

  // save filters to local storage on change
  useEffect(() => {
    if (filterLearnGroups !== undefined) {
      localStorage.setItem("filters", JSON.stringify(filterLearnGroups));
    }
  }, [filterLearnGroups]);

  // save filters to local storage on change
  useEffect(() => {
    if (filterCourses !== undefined) {
      localStorage.setItem("filters-courses", JSON.stringify(filterCourses));
    }
  }, [filterCourses]);

  return {
    codetables,
    filterLearnGroups,
    setFilterLearnGroups,
    filterCourses,
    setFilterCourses,
  };
};

export default useCodetables;
