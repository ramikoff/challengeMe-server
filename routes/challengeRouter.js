import { Router } from "express";

import {
  getAllChallenges,
  getChallengeByID,
  createChallenge,
  updateChallengeByID,
  deleteChallengeByID,
} from "../controllers/challengeControllers.js";
import authenticate from "../middlewares/authenticate.js";

const challengeRouter = Router();

challengeRouter.get("/", getAllChallenges);
challengeRouter.get("/:id", getChallengeByID);

challengeRouter.post("/", authenticate, createChallenge);

challengeRouter.delete("/:id", deleteChallengeByID);

export default challengeRouter;
