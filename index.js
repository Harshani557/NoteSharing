import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/noteRoute.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
.then(() => {
  console.log("Database connected successfully.");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((error) => console.log(error));

app.use("/api/notes", route);