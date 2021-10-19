import express from "express";
import CryptoJS from "crypto-js";

import User from "../models/User.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// @desc update user
// @route PUT /api/users/:id
router.put("/:id", verifyToken, async (req, res) => {
  // check if operation is made by admin or user
  if (req.user.id === req.params.id || req.user.isAdmin) {
    // if password is being updated, hash it
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.CRYPTO_SECRET
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json({ success: true, data: updatedUser });
    } catch (err) {
      res.status(500).json({ success: false, data: err.message });
    }
  } else {
    res.status(403).json({
      success: false,
      data: "You are not allowed to perform this action!",
    });
  }
});

// @desc delete user
// @route DELETE /api/users/:id
router.delete("/:id", verifyToken, async (req, res) => {
  // check if operation is made by admin or user
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.user.id);

      res.status(200).json({ success: true, data: "User deleted..." });
    } catch (err) {
      res.status(500).json({ success: false, data: err.message });
    }
  } else {
    res.status(403).json({
      success: false,
      data: "You are not allowed to perform this action!",
    });
  }
});

// @desc GET user
// @route GET /api/users/find/:id
router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    // "password:0" skips the password while fetching from DB
    const user = await User.findById(req.user.id, { password: 0 });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, data: err.message });
  }
});

// @desc get all users
// @route GET /api/users/
router.get("/", verifyToken, async (req, res) => {
  // check if operation is made by admin only
  if (req.user.isAdmin) {
    try {
      const users = req.query.new
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();

      res.status(200).json({ success: true, data: users });
    } catch (err) {
      res.status(500).json({ success: false, data: err.message });
    }
  } else {
    res.status(403).json({
      success: false,
      data: "You are not allowed to access this information!",
    });
  }
});

// @desc get user stats
// @route GET /api/users/stats
router.get("/stats", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);

    try {
      // get number of users created each month(only for prev 1yr)
      const data = await User.aggregate([
        { $match: { createdAt: { $gt: date } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, data: err.message });
    }
  } else {
    res.status(403).json({
      success: false,
      data: "You are not allowed to access this information!",
    });
  }
});

export default router;
