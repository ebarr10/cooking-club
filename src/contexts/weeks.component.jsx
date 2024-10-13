import { createContext, useState, useEffect } from "react";
import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils";

export const WeeksContext = createContext({
  weeksMapping: [],
});

export const WeeksProvider = ({ children }) => {
  const [weeksMapping, setWeeksMapping] = useState([]);

  useEffect(() => {
    async function getWeeks() {
      const weeksMap = await getCollectionAndDocuments("weeks");
      setWeeksMapping(weeksMap);
    }
    getWeeks();
  }, []);

  const value = { weeksMapping };
  return (
    <WeeksContext.Provider value={value}>{children}</WeeksContext.Provider>
  );
};
