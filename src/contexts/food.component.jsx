import React from "react";
import { createContext, useState, useEffect } from "react";
import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils";

export const FoodContext = createContext({
  foodMapping: [],
});

export const FoodProvider = React.memo(({ children }) => {
  const [foodMapping, setFoodMapping] = useState([]);

  useEffect(() => {
    async function getFood() {
      const foodMapping = await getCollectionAndDocuments("food");
      setFoodMapping(foodMapping);
    }
    getFood();
  }, []);

  const value = { foodMapping };
  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
});
