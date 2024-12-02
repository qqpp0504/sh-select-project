import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "../../util/http.js";

export default function ProductsList() {
  const {
    data: products,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => fetchProducts({ signal }),
    staleTime: 0,
    retry: 1,
    retryDelay: 1000,
    timeout: 5000,
  });

  if (isPending) {
    return <div>載入中...</div>;
  }

  if (isError) {
    return <div>發生錯誤：{error.message}</div>;
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
