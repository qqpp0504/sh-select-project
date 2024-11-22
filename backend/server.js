import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";

const app = express();

// 設定靜態文件目錄，這樣 images 資料夾內的檔案會被直接提供
app.use(express.static("public/images/banner"));
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

// 讀取並返回不同頁面的資料
app.get("/banner/:page", async (req, res) => {
  const page = req.params.page; // 獲取頁面分類 (homePage, menPage, womenPage)

  try {
    const fileContent = await fs.readFile("./data/banner.json");
    const eventsData = JSON.parse(fileContent); // 將 JSON 內容轉換為物件

    if (eventsData[page]) {
      // 如果找到對應頁面資料
      res.status(200).json(eventsData[page]);
    } else {
      res.status(404).json({ message: `Page ${page} not found` }); // 頁面分類不存在
    }
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
