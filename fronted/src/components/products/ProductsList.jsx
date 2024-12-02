import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";

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

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {products.map((product) => (
        <div key={product.id}>
          <img src={`/products/${product.image}`} alt={product.name} />
          <h3>{product.name}</h3>
          <p>原價: {product.originalPrice}</p>
          <p>售價: {product.discountPrice}</p>
          {product.isNew && <span>新品</span>}
          {product.isOnSale && <span>特賣</span>}
        </div>
      ))}
    </div>
  );
}
