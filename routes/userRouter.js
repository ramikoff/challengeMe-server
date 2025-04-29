import { Router } from "express";
import User from "../models/User.js";
import {
  getUserByID,
  getAllUsers,
  createUser,
  updateUserByID,
  deleteUserByID,
  addChallengeToFavoriteList,
  updateChallengeStatus,
  deleteChallengeFromFavoriteList,
} from "../controllers/userControllers.js";
import authenticate from "../middlewares/authenticate.js";
import {
  login,
  userSignup,
  logout,
  getMe,
} from "../controllers/authControllers.js";

const userRouter = Router();

userRouter.post("/auth/signup", userSignup);
userRouter.post("/auth/login", login);
userRouter.get("/me", authenticate, getMe);
userRouter.post("/me", authenticate, getMe);

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserByID);

userRouter.put("/:id", updateUserByID);
userRouter.delete("/:id", deleteUserByID);

export default userRouter;
