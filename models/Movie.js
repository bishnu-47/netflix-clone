import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, requried: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: String },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie;
