import express from "express";
import User from "../models/User.js";
import Cryptojs from "crypto-js";

const router = express.Router();

// @desc registration route
// @route POST /api/auth/register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({
      username,
      email,
      password: Cryptojs.AES.encrypt(
        password,
        process.env.CRYPTO_SECRET
      ).toString(),
    });
    await user.save();

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      data: e.message,
    });
  }
});

export default router;
