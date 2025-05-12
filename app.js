import ErrorResponse from "./utils/ErrorResponse.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Router } from "express";
import mongoose from "mongoose";
import openaiRouter from "./routes/openaiRouter.js";
import { challengeRouter, userRouter } from "./routes/index.js";

const app = express();

console.log("Initializing middleware...");
app.use(express.json(), cookieParser());

const whitelist = [
  "http://localhost:5173",
  "https://challengemerpb.netlify.app",
];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  const dbResponse = await mongoose.connection.db.admin().ping();
  if (dbResponse.ok !== 1) throw new ErrorResponse("DB not connected", 503);
  res.json({ message: "Running", dbResponse });
});

console.log("Initializing routes...");
const v1Router = Router();

v1Router.use("/users", userRouter);
v1Router.use("/challenges", challengeRouter);

app.use("/api/openai", openaiRouter);

console.log("Routes initialized successfully.");
app.use("/api/v1", v1Router);

app.use("/*splat", (req, res) => {
  throw new ErrorResponse(`Check the route. You used ${req.originalUrl}`, 404);
});

app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

mongoose.set("debug", true);

app.use((err, req, res, next) => {
  console.log("Error handler called:", err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
});

export default app;
