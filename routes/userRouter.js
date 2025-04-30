import { Router } from "express";

import {
  getUserByID,
  getAllUsers,
  updateUserByID,
  deleteUserByID,
  addChallengeToFavoriteList,
  addChallengeToActiveChallenges,
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

userRouter.post(
  "/:id/favoriteList/:challengeId",
  authenticate,
  addChallengeToFavoriteList
);
userRouter.post(
  "/:id/activeList/:challengeId",
  authenticate,
  addChallengeToActiveChallenges
);
userRouter.delete(
  "/:id/favoriteList/:challengeId",
  deleteChallengeFromFavoriteList
);

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserByID);

userRouter.put("/:id", authenticate, updateUserByID);
userRouter.delete("/:id", authenticate, deleteUserByID);

export default userRouter;
