import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./database/db.js";

// **** Dotenv Config ****/
dotenv.config();

// **** Database Config ****/
connectDB();

// ***** Rest Obj *****/
const app = express();

// ***** Middleware *****/
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ********* Port & Listen *********/
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on Port ${port}.`
      .bgBrightBlue.white
  );
});
