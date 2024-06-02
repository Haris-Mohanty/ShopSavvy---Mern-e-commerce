import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// **** Dotenv Config ****/
dotenv.config();

// **** Database Config ****/
connectDB();

// ***** Rest Obj *****/
const app = express();

// ***** Middleware *****/
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // Enable credentials
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// ***** Middleware Routes *****/
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/product", productRoutes);

// ********* Port & Listen *********/
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on Port ${port}.`
      .bgBrightBlue.white
  );
});
