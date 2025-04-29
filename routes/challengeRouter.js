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

challengeRouter.post("/", authenticate, createChallenge);

challengeRouter.delete("/", deleteChallengeByID);

export default challengeRouter;
