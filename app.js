import express, { Router } from "express";
import cors from "cors";
import ErrorResponse from "./utils/ErrorResponse.js";
import { userRouter, challengeRouter } from "./routes/index.js";

const app = express();

console.log("Initializing middleware...");
app.use(express.json());

app.use(cors());

app.get("/", async (req, res) => {
  const dbResponse = await mongoose.connection.db.admin().ping();
  if (dbResponse.ok !== 1) throw new ErrorResponse("DB not connected", 503);
  res.json({ message: "Running", dbResponse });
});

console.log("Initializing routes...");
const v1Router = Router();

v1Router.use("/users", userRouter);
v1Router.use("/challenges", challengeRouter);

console.log("Routes initialized successfully.");
app.use("/api/v1", v1Router);

app.use("/*splat", (req, res) => {
  throw new ErrorResponse(`Check the route. You used ${req.originalUrl}`, 404);
});

app.use((err, req, res, next) => {
  console.log("Error handler called:", err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
});

export default app;
