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
