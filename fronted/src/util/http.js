import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchBanner({ page, signal }) {
  const response = await fetch(`http://localhost:3000/${page}`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("發生錯誤，無法獲取圖片");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const resData = await response.json();

  return resData;
}

export async function fetchProducts({ filters, signal }) {
  const query =
    filters && Object.keys(filters).length > 0
      ? `?${new URLSearchParams(filters).toString()}`
      : "";

  const response = await fetch(`http://localhost:3000/products${query}`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("發生錯誤，無法獲取商品資訊");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const resData = await response.json();
  return resData;
}
