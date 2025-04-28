import { Router } from "express";
import Challenge from "../models/Challenge.js";

const challengeRouter = Router();

challengeRouter.get("/", async (req, res) => {
  const challenges = await Challenge.find();
  res.json({ data: challenges });
});

challengeRouter.post("/", async (req, res) => {
  const challenge = await Challenge.create(req.body);
  res.json({ data: challenge });
});

export default challengeRouter;
