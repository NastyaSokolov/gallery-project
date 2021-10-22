import express from "express";
import mongoose from "mongoose";
import path from "path";
import servRoutes from "./routes/servers.js";
const app = express();
const PORT = process.env.PORT ?? 3000;
const __dirname = path.resolve();
app.use(express.static("./static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(servRoutes);

const init = () => {
  mongoose
    .connect(
      "mongodb+srv://USERNAME:PASSWORD@cluster0.2zsyv.mongodb.net/items",
      { useNewUrlParser: true }
    )
    .then(
      app.listen(PORT, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Server is running on ${PORT}...`);
        }
      })
    );
};
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "ejs"));

init();
