import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ProductsCard from "./ProductsCard.jsx";

export default function ProductsList() {
  const {
    data: products,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", { filters: {} }],
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

  return <ProductsCard products={products} />;
}
