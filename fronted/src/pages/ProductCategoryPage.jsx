import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { fetchProducts } from "../util/http.js";

import LoadingIndicator from "../components/UI/LoadingIndicator.jsx";
import ErrorBlock from "../components/UI/ErrorBlock.jsx";
import ProductsList from "../components/products/ProductsList.jsx";

export default function ProductCategoryPage() {
  const categoryObject = useParams();

  const {
    data: products,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", { filters: { gender: categoryObject.category } }],
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
