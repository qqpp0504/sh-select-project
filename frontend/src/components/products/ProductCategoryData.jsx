import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "@/util/http.js";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import ProductsList from "./ProductsList.jsx";

export default function ProductCategoryData() {
  const [searchParams] = useSearchParams();

  const gender = searchParams.get("gender") || "";
  const newProduct = searchParams.get("newProduct") || "";
  const onSale = searchParams.get("onSale") || "";
  const brands = searchParams.get("brands") || "";
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  const {
    data: products,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "products",
      { filters: { gender, newProduct, onSale, brands, category, search } },
    ],
    queryFn: ({ signal, queryKey }) =>
      fetchProducts({ signal, ...queryKey[1] }),
    staleTime: 0,
    retry: 1,
    retryDelay: 1000,
    timeout: 5000,
  });

  if (isPending) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorBlock message={error.info?.message || "資料加載失敗"} />;
  }

  return (
    <>
      <ProductsList products={products} />
    </>
  );
}
