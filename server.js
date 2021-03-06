import dotenv from "dotenv";
dotenv.config();
import path from "path";

import express from "express";
import colors from "colors";

import connectDB from "./config/db.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import movieRoute from "./routes/movies.js";

const app = express();
connectDB();

//middlewares
app.use(express.json());

//routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server started in ${process.env.NODE_ENV} mode on PORT: ${PORT}`.yellow
  );
});
