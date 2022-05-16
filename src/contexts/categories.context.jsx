import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from "../shop-data";
import {
  // addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // ----------Running this once to create collection in the database---------- //
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA); // create new collection with name=categories
  // }, []);

  // get categories from database
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories");
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
