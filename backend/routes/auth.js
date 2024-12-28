import express from "express";
import { add, get } from "../modules/user.js";
import { createJSONToken } from "../util/auth.js";
import bcrypt from "bcrypt";

const router = express.Router();

// 確認信箱有無註冊
router.post("/accounts", async (req, res, next) => {
  try {
    const data = req.body;
    let errors = {};

    // 檢查是否已存在
    try {
      const existingUser = await get(data.email);
      if (existingUser) {
        errors.email = "Email exists already.";
        return res.status(200).json({
          email: data.email,
          isNotExist: false,
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

// 註冊處理邏輯
router.post("/accounts/register", async (req, res, next) => {
  try {
    const data = req.body;
    let errors = {};

    // 如果有驗證錯誤，立即返回
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    const createdUser = await add(data);
    const authToken = createJSONToken(createdUser.email);
    res
      .status(201)
      .json({ message: "User created.", user: createdUser, token: authToken });
  } catch (error) {
    // 如果發生錯誤，傳給錯誤處理中間件
    return next(error);
  }
});

// 登入處理邏輯
router.post("/accounts/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let errors = {};

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    // 取得用戶資料
    let user;
    try {
      user = await get(email);

      if (!user) {
        return res.status(401).json({
          message: "你的驗證資訊無效",
          errors: {
            email: "Email not found",
          },
        });
      }
    } catch (error) {
      return res.status(401).json({
        message: "你的驗證資訊無效",
        errors: {
          email: "Email not found",
        },
      });
    }

    // 驗證密碼
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "你的驗證資訊無效",
        errors: {
          password: "Invalid password",
        },
      });
    }

    // 生成 JWT token
    const token = createJSONToken(email);

    // 回傳成功回應
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
