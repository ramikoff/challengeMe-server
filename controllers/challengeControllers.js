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
  try {
    const challenge = await Challenge.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res
      .status(201)
      .json({ message: "Challenge created successfully", data: challenge });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
  const challenge = await Challenge.findByIdAndDelete(id);
  if (!challenge) throw new ErrorResponse("challenge not found", 404);
  res.json({ message: "challenge deleted successfully", data: challenge });
};

export {
  getAllChallenges,
  getChallengeByID,
  createChallenge,
  updateChallengeByID,
  deleteChallengeByID,
};
