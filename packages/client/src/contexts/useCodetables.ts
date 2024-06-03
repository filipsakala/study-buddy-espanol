import { useEffect, useState } from "react";
import { Codetables } from "../types/Codetables";

const useCodetables = (
  getCodetablesApiCall: () => Promise<Codetables | undefined>
) => {
  const [codetables, setCodetables] = useState<Codetables | undefined>();
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

  // save filters to local storage on change
  useEffect(() => {
    if (filterLearnGroups !== undefined) {
      localStorage.setItem("filters", JSON.stringify(filterLearnGroups));
    }
  }, [filterLearnGroups]);

  return { codetables, filterLearnGroups, setFilterLearnGroups };
};

export default useCodetables;
