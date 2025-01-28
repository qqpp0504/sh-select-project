import pkg from "bcryptjs";
import { v4 as generateId } from "uuid";

import { NotFoundError } from "../util/errors.js";
import {
  readData,
  writeData,
  readOrdersData,
  writeOrdersData,
} from "./util.js";

const { hash } = pkg;

async function add(data) {
  const storedData = await readData();
  const userId = generateId();
  const hashedPw = await hash(data.password, 12);
  if (!storedData.users) {
    storedData.users = [];
  }
  storedData.users.push({ ...data, password: hashedPw, id: userId });
  await writeData(storedData);
  return { id: userId, email: data.email };
}

// 假設你有一個用來讀取和寫入資料的 readData 和 writeData 函式
async function addFavorite(userEmail, product) {
  const storedData = await readData();

  // 找到對應的使用者
  const user = storedData.users.find((user) => user.email === userEmail);

  if (!user) {
    throw new Error("使用者未找到");
  }

  // 確保使用者的 favorites 屬性存在
  if (!user.favorites) {
    user.favorites = [];
  }

  // 檢查是否已經加入過相同的最愛
  const existingFavorite = user.favorites.find(
    (favorite) => favorite.id === product.id
  );

  if (existingFavorite) {
    throw new Error("這個商品已經在最愛清單中。");
  }

  // 加入新的最愛
  const favoriteId = generateId(); // 假設這是生成唯一最愛ID的函式
  user.favorites.push({ ...product, favoriteId });

  // 更新資料庫中的資料
  await writeData(storedData);

  return { product };
}

async function deleteFavorite(userEmail, favoriteId) {
  const storedData = await readData();

  // 找到對應的使用者
  const user = storedData.users.find((user) => user.email === userEmail);

  if (!user) {
    throw new Error("使用者未找到");
  }

  // 在 favorites 中找到並刪除指定的商品
  user.favorites = user.favorites.filter(
    (product) => product.favoriteId !== favoriteId
  );

  await writeData(storedData);

  return user.favorites;
}

async function getFavorite(userEmail) {
  const storedData = await readData();

  // 找到對應的使用者
  const user = storedData.users.find((user) => user.email === userEmail);

  if (!user) {
    throw new Error("使用者未找到");
  }

  // 確保使用者的 favorites 屬性存在，若沒有則回傳空陣列
  if (!user.favorites) {
    user.favorites = [];
  }

  return user.favorites;
}

async function get(email) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError("Could not find any users.");
  }

  const user = storedData.users.find((ev) => ev.email === email);
  if (!user) {
    throw new NotFoundError("Could not find user for email " + email);
  }

  return user;
}

// 新增訂單
async function addOrder(userEmail, newOrder) {
  const storedUserData = await readData();
  const storedOrdersData = await readOrdersData();

  function generateOrderDateTime() {
    const now = new Date();

    const year = now.getFullYear(); // 取得年份
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 取得月份（補0）
    const day = String(now.getDate()).padStart(2, "0"); // 取得日期（補0）

    const hours = String(now.getHours()).padStart(2, "0"); // 小時（補0）
    const minutes = String(now.getMinutes()).padStart(2, "0"); // 分鐘（補0）
    const seconds = String(now.getSeconds()).padStart(2, "0"); // 秒數（補0）

    // 將日期與時間格式化
    const date = `${year}年${month}月${day}日`; // 年-月-日
    const time = `${hours}:${minutes}:${seconds}`; // 時:分:秒

    return { date, time };
  }

  const { date, time } = generateOrderDateTime(); // 取得當前日期與時間

  if (newOrder.orderType === "guest") {
    storedOrdersData.orders.push({
      ...newOrder,
      date,
      time,
      orderId: generateId(), // 生成訂單 ID
    });

    // 寫回資料
    await writeOrdersData(storedOrdersData);
    return { newOrder };
  }

  if (newOrder.orderType === "member") {
    // 尋找對應的會員
    const user = storedUserData.users.find((user) => user.email === userEmail);

    if (!user) {
      throw new Error("使用者未找到");
    }

    if (!user.orders) {
      user.orders = [];
    }

    // 新增訂單到該會員的訂單列表
    const orderWithId = {
      ...newOrder,
      date,
      time,
      orderId: generateId(), // 生成訂單 ID
    };

    user.orders.push(orderWithId);
    await writeData(storedUserData);

    storedOrdersData.orders.push(orderWithId);
    await writeOrdersData(storedOrdersData);
    return { newOrder };
  }
}

async function getOrders(userEmail) {
  const storedData = await readData();

  // 找到對應的使用者
  const user = storedData.users.find((user) => user.email === userEmail);

  if (!user) {
    throw new Error("使用者未找到");
  }

  if (!user.orders) {
    user.orders = [];
  }

  return user.orders;
}

async function getOrderById(userEmail, orderId) {
  const storedData = await readData();

  // 找到對應的使用者
  const user = storedData.users.find((user) => user.email === userEmail);

  if (!user) {
    throw new Error("使用者未找到");
  }

  if (!user.orders) {
    user.orders = [];
  }

  // 查找指定的訂單
  const order = user.orders.find((order) => order.orderId === orderId);

  if (!order) {
    throw new Error("訂單未找到");
  }

  return order;
}

export {
  add,
  addFavorite,
  getFavorite,
  deleteFavorite,
  get,
  addOrder,
  getOrders,
  getOrderById,
};
