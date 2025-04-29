import User from "../models/User.js";
import Challenge from "../models/Challenge.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const getAllChallenges = async (req, res) => {
  const challenges = await Challenge.find().lean();
  res.json({ data: challenges });
};

const getChallengeByID = async (req, res) => {
  const { id } = req.params;
  const challenge = await Challenge.findById(id).lean();
  if (!challenge) throw new ErrorResponse("User not found", 404);
  res.json({ data: challenge });
};

const createChallenge = async (req, res) => {
  const challenge = await Challenge.create(req.body);
  res
    .status(201)
    .json({ message: "Challenge created successfully", data: challenge });
};

const updateChallengeByID = async (req, res) => {
  const { id } = req.params;
  const challenge = await Challenge.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!challenge) throw new ErrorResponse("user not found", 404);
  res.json({ message: "user updated successfully", data: challenge });
};

const deleteChallengeByID = async (req, res) => {
  const { id } = req.params;
  const challenge = await User.findByIdAndDelete(id);
  if (!challenge) throw new ErrorResponse("user not found", 404);
  res.json({ message: "user deleted successfully", data: challenge });
};

export {
  getAllChallenges,
  getChallengeByID,
  createChallenge,
  updateChallengeByID,
  deleteChallengeByID,
};
