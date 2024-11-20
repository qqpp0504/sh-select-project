const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// 假設用戶數據儲存在這裡，實際應該從資料庫中讀取
const users = [
  {
    id: 1,
    username: "testuser",
    password: "$2a$10$VJVGhd13D4HzXLoE8gdyw.c/nrZhxhtkzz4qZXeFJlOV0lB5lhAOG",
  }, // 密碼是 "password123" 的哈希值
];

// 登入處理邏輯
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // 檢查用戶是否存在
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 比對密碼
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 如果認證成功，產生 JWT token
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    "your_jwt_secret_key", // 請確保這個密鑰不公開，並且保護好
    { expiresIn: "1h" } // 設定過期時間為 1 小時
  );

  res.json({ message: "Login successful", token });
});

module.exports = router;
