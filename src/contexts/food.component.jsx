import React from "react";
import { createContext, useState, useEffect } from "react";
import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils";

export const FoodContext = createContext({
  foodMapping: [],
  uploadedNewItem: true,
});

export const FoodProvider = React.memo(({ children }) => {
  const [foodMapping, setFoodMapping] = useState([]);
  const [uploadedNewItem, setUploadedNewItem] = useState(true);

  useEffect(() => {
    if (uploadedNewItem) {
      async function getFood() {
        const foodMapping = await getCollectionAndDocuments("food");
        setFoodMapping(foodMapping);
      }
      getFood();
      setUploadedNewItem(false);
    }
    return () => {};
  }, [uploadedNewItem]);

  const value = { foodMapping, setUploadedNewItem };
  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
});
