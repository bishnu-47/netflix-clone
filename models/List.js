import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, requried: true, unique: true },
    type: { type: String },
    genre: { type: String },
    content: { type: Array },
  },
  { timestamps: true }
);

const List = mongoose.model("List", ListSchema);

export default List;
