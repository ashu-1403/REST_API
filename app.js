import express from "express";
import mongoose from "mongoose";
import router from "./routes/routes.js";
import pageRouter from "./routes/page.routes.js";

const app = express();
app.use(express.json());

app.use("/api/user", router);
app.use("/api/page",pageRouter)


mongoose
  .connect(
// MONGODB_URI
  )
  .then(() => {
    app.listen(8800);
    console.log("Server started, database connected");
  })
  .catch((err) => console.log(err));

  