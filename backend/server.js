import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";

const app = express();

// 設定靜態文件目錄，這樣 images 資料夾內的檔案會被直接提供
app.use(express.static("public"));
app.use(bodyParser.json());

// CORS 設定
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 允許所有域名訪問
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // 允許的 HTTP 方法
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // 允許的標頭

  next();
});

// 讀取事件資料
app.get("/events", async (req, res) => {
  try {
    const fileContent = await fs.readFile("./data/events.json");
    const eventsData = JSON.parse(fileContent); // 將 JSON 內容轉換為物件

    res.status(200).json({ events: eventsData });
  } catch (error) {
    res.status(500).json({ message: "Error reading events data" });
  }
});

// 404 處理
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next(); // 處理 OPTIONS 預檢請求
  }
  res.status(404).json({ message: "404 - Not Found" });
});

// 啟動伺服器
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
