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

  const response = await fetch(`http://localhost:3000/products/${query}`, {
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

  const resData = await response.json();
  return resData;
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

  const resData = await response.json();
  return resData;
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

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(resData.user));

  return resData;
}

export async function addFavorites(product) {
  const user = localStorage.getItem("user");
  if (!user) {
    const error = new Error("您尚未登入，無法添加收藏");
    throw error;
  }

  const response = await fetch("http://localhost:3000/favorites/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: JSON.parse(user).email, product: product }),
  });

  if (!response.ok) {
    const error = new Error("無法加入收藏");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const resData = await response.json();
  return resData;
}

export async function deleteFavoriteProduct(favoriteId) {
  const user = localStorage.getItem("user");

  const response = await fetch("http://localhost:3000/favorites/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: JSON.parse(user).email,
      favoriteId: favoriteId,
    }),
  });

  if (!response.ok) {
    const error = new Error("發生錯誤，無法刪除商品");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const resData = await response.json();
  return resData;
}

export async function fetchUserFavorites({ userEmail, signal }) {
  const response = await fetch(
    `http://localhost:3000/favorites/user/${userEmail}`,
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

export async function addOrder(newOrder) {
  const user = localStorage.getItem("user");

  const response = await fetch("http://localhost:3000/checkout/add-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail: JSON.parse(user).email,
      newOrder,
    }),
  });

  if (!response.ok) {
    const error = new Error("無法新增訂單");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const resData = await response.json();
  return resData;
}

export async function fetchUserOrders({ userEmail, signal }) {
  const response = await fetch(
    `http://localhost:3000/checkout/orders/${userEmail}`,
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

export async function fetchUserOrderDetail({ userEmail, orderId, signal }) {
  const response = await fetch(
    `http://localhost:3000/checkout/orders/${userEmail}/${orderId}`,
    {
      signal,
    }
  );

  if (!response.ok) {
    const error = new Error("發生錯誤，無法獲取訂單資訊");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const resData = await response.json();
  return resData;
}
