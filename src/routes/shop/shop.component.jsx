import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { useDispatch } from "react-redux";
import { setCategoriesMap } from "../../store/categories/categories.action";
import { getCategoriesAndDocuments } from "../../utils/firebase.utils";
import { useEffect } from "react";

const Shop = () => {
  const dispatch = useDispatch();

  // Get categories from database
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories");
      dispatch(setCategoriesMap(categoryMap));
    };

    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
