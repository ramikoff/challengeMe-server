import { Router } from "express";
import Challenge from "../models/Challenge.js";
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

export default challengeRouter;
