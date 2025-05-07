import { Router } from "express";
import { generateChallenge } from "../controllers/openaiControllers.js";

const openaiRouter = Router();

openaiRouter.post("/generate", generateChallenge);

export default openaiRouter;
