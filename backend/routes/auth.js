import express from "express";
import { add, get } from "../modules/user.js";
import { createJSONToken } from "../util/auth.js";

const router = express.Router();

// 註冊處理邏輯
router.post("/accounts", async (req, res, next) => {
  try {
    const data = req.body;
    let errors = {};

    // 檢查是否已存在
    try {
      const existingUser = await get(data.email);
      if (existingUser) {
        errors.email = "Email exists already.";
        return res.status(409).json({
          message: "Email check failed",
          errors,
        });
      }

      // 如果到這裡表示信箱不存在
      return res.status(200).json({
        email: data.email,
        isNotExist: true,
      });
    } catch (error) {
      // 如果在 get 中捕獲錯誤，意味著用戶不存在
      return res.status(200).json({
        email: data.email,
        isNotExist: true,
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default router;
