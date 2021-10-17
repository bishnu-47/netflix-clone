import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const router = express.Router();

// @desc registration route
// @route POST /api/auth/register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // create user encrypting the password
    const user = new User({
      username,
      email,
      password: CryptoJS.AES.encrypt(
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

// @desc login route
// @route POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    // if no user found
    !user &&
      res
        .status(401)
        .json({ success: false, data: "Invalid email or password" });

    // decrypt the recived password
    const bytes = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPTO_SECRET
    );
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    // if password doesn't match
    originalPassword !== req.body.password &&
      res
        .status(401)
        .json({ success: false, data: "Invalid email or password" });

    // create a jwt access token
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // seperate password from response
    const { password, ...info } = user._doc;
    res.status(200).json({ success: true, data: { ...info, accessToken } });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
    });
  }
});

export default router;
