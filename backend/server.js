import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";

const app = express();

// 設定靜態文件目錄，這樣 images 資料夾內的檔案會被直接提供
app.use(express.static("public/banner"));
app.use(express.static("public/products"));
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

app.get("/products", async (req, res) => {
  const { category, onSale, gender, isNew } = req.query;

  try {
    const fileContent = await fs.readFile("./data/products.json");
    const products = JSON.parse(fileContent);

    // 如果沒有任何篩選條件，直接返回所有商品
    if (!category && !onSale && !gender && !isNew) {
      return res.status(200).json(products);
    }

    // 篩選產品
    const filteredProducts = products.filter((product) => {
      const matchesGender = gender
        ? gender.split(",").includes(product.gender)
        : true; // 如果未提供 gender，匹配所有
      const matchesCategory = category ? product.category === category : true;
      const matchesOnSale = onSale
        ? product.isOnSale === (onSale === "true")
        : true;
      const matchesIsNew = isNew ? product.isNew === (isNew === "true") : true;

      // 返回符合所有條件的產品
      return matchesGender && matchesCategory && matchesOnSale && matchesIsNew;
    });

    return res.status(200).json(filteredProducts);
  } catch (error) {
    console.error("Error reading products:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/:page", async (req, res) => {
  const page = req.params.page; // 獲取頁面分類 (homePage, menPage, womenPage, ...)

  if (!page || typeof page !== "string") {
    return res.status(400).json({ message: "Invalid page parameter" });
  }

  const fileContent = await fs.readFile("./data/banner.json");
  const eventsData = JSON.parse(fileContent); // 將 JSON 內容轉換為物件

  if (eventsData[page]) {
    // 如果找到對應頁面資料
    return res.status(200).json(eventsData[page]);
  } else {
    return res.status(404).json({ message: `Page ${page} not found` });
  }
});

// 啟動伺服器
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
