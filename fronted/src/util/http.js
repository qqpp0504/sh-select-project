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

export async function fetchProductDetail({ slug, signal }) {
  const response = await fetch(
    `http://localhost:3000/products/${encodeURIComponent(slug)}`,
    {
      signal,
    }
  );

  if (!response.ok) {
    const error = new Error("發生錯誤，無法獲取商品資訊");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const resData = await response.json();
  return resData;
}

export async function authEmail(userInputEmail) {
  const response = await fetch("http://localhost:3000/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInputEmail),
  });

  if (!response.ok) {
    const error = new Error("無法驗證信箱");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const resdata = await response.json();
  return resdata;
}

export async function registerUser(userData) {
  const response = await fetch("http://localhost:3000/accounts/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = new Error("無法註冊帳戶");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const resdata = await response.json();
  return resdata;
}

export async function loginUser(userData) {
  const response = await fetch("http://localhost:3000/accounts/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = new Error("無法登入帳戶");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const resdata = await response.json();
  const token = resdata.token;

  localStorage.setItem("token", token);

  return null;
}
