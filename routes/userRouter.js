import { Router } from "express";
import User from "../models/User.js";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  console.log("GET /users called");
  const users = await User.find();
  res.json({ data: users });
});

userRouter.post("/", async (req, res) => {
  console.log("POST /users called");
  console.log("Request body:", req.body);
  const user = await User.create(req.body);
  res.json({ data: user });
});

export default userRouter;
