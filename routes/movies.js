import express from "express";

import Movie from "../models/Movie.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// @desc create Movie
// @route POST /api/movies
router.post("/", verifyToken, async (req, res) => {
  // check if operation is made by admin
  if (req.user.isAdmin) {
    try {
      const movie = await Movie.create(req.body);

      res.status(201).json({
        success: true,
        data: movie,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        data: err.message,
      });
    }
  } else {
    res.status(403).json({
      success: false,
      data: "You are not allowed to perform this action!",
    });
  }
});

// @desc update Movie
// @route PUT /api/movies
router.put("/:id", verifyToken, async (req, res) => {
  // check if operation is made by admin
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      if (!updatedMovie)
        res.status(404).json({ success: false, data: "Movie not found!" });

      res.status(200).json({
        success: true,
        data: updatedMovie,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        data: err.message,
      });
    }
  } else {
    res.status(403).json({
      success: false,
      data: "You are not allowed to perform this action!",
    });
  }
});

// @desc delete Movie
// @route DELETE /api/movies
router.delete("/:id", verifyToken, async (req, res) => {
  // check if operation is made by admin
  if (req.user.isAdmin) {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

      if (!deletedMovie)
        res.status(404).json({ success: false, data: "Movie not found!" });

      res.status(200).json({
        success: true,
        data: "Movie deleted successfully...",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        data: err.message,
      });
    }
  } else {
    res.status(403).json({
      success: false,
      data: "You are not allowed to perform this action!",
    });
  }
});

// @desc get a Movie
// @route GET /api/movies
router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie)
      res.status(404).json({ success: false, data: "Movie not found!" });

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
    });
  }
});

// @desc get featured movie (random movie)
// @route GET /api/movies/featured?type=$type
router.get("/featured", verifyToken, async (req, res) => {
  const { type } = req.query;
  try {
    const featuredMovie = await Movie.aggregate([
      { $match: { isSeries: type === "series" ? true : false } },
      { $sample: { size: 1 } },
    ]);

    if (!featuredMovie)
      res.status(404).json({ success: false, data: "Movie not found!" });

    res.status(200).json({ success: true, data: featuredMovie });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
    });
  }
});

// @desc get all Movie
// @route GET /api/movies
router.get("/", verifyToken, async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });

    if (!movies)
      res.status(404).json({ success: false, data: "Movies not found!" });

    res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
    });
  }
});
export default router;
