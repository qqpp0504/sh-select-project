import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { filterActions } from "../../store/filter-slice.js";

export default function ProductFilter() {
  const filters = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 根據 Redux 狀態更新 URL
  useEffect(() => {
    const { category, gender, newProduct, onSale, brands } = filters;
    const queryParams = new URLSearchParams();

    if (gender.length > 0) {
      if (gender.includes("men") && gender.includes("women")) {
        queryParams.set("gender", "unisex");
      } else {
        queryParams.set("gender", gender);
      }
    }
    if (category.length > 0) queryParams.set("category", category);
    if (newProduct.length > 0) queryParams.set("newProduct", "new");
    if (onSale.length > 0) queryParams.set("onSale", "sale");
    if (brands.length > 0) queryParams.set("brands", brands.join("-"));

    navigate({ pathname: "/products", search: queryParams.toString() });
  }, [filters, navigate]);

  // 根據 URL 同步 Redux 狀態
  useEffect(() => {
    const category = searchParams.get("category") || "";
    const genderParam = searchParams.get("gender");
    const newProduct = searchParams.get("newProduct") === "new";
    const onSale = searchParams.get("onSale") === "sale";
    const brands = searchParams.get("brands")?.split("-").sort() || [];

    if (genderParam === "unisex") {
      dispatch(filterActions.updateGenderFilter(["men", "women"]));
    } else if (genderParam) {
      dispatch(filterActions.updateGenderFilter([genderParam]));
    } else {
      dispatch(filterActions.updateGenderFilter([]));
    }

    dispatch(filterActions.updateCategoryFilter(category));
    dispatch(filterActions.updateNewProductFilter(newProduct ? ["new"] : []));
    dispatch(filterActions.updateSaleFilter(onSale ? ["sale"] : []));
    dispatch(filterActions.updateBrandFilter(brands));
  }, [searchParams, dispatch]);

  return null;
}
