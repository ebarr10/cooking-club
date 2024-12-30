import React from "react";
import { createContext, useState, useEffect } from "react";
import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils";

export const WeeksContext = createContext({
  weeksMapping: [],
});

export const WeeksProvider = React.memo(({ children }) => {
  const [weeksMapping, setWeeksMapping] = useState([]);

  useEffect(() => {
    async function getWeeks() {
      const weeksMap = await getCollectionAndDocuments("weeks");
      let sortedWeeksMap = weeksMap.sort((a, b) => a.id - b.id);
      setWeeksMapping(sortedWeeksMap);
    }
    getWeeks();
  }, []);

  const value = { weeksMapping };
  return (
    <WeeksContext.Provider value={value}>{children}</WeeksContext.Provider>
  );
});
