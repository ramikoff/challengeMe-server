import User from "../models/User.js";
import Challenge from "../models/Challenge.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const getAllUsers = async (req, res) => {
  const users = await User.find().lean();
  res.json({ data: users });
};

const getUserByID = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .populate("favoriteList.challengeRefId", "challengeTitle challengeCategory")
    .populate(
      "activeChallenges.challengeRefId",
      "challengeTitle challengeCategory"
    )
    .lean();
  if (!user) throw new ErrorResponse("User not found", 404);
  res.json({ data: user });
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ message: "User created successfully", data: user });
};

const updateUserByID = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!user) throw new ErrorResponse("user not found", 404);
  res.json({ message: "user updated successfully", data: user });
};

const deleteUserByID = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ErrorResponse("user not found", 404);
  res.json({ message: "user deleted successfully", data: user });
};

const addChallengeToFavoriteList = async (req, res) => {
  const { id, challengeId } = req.params;

  const challengeExists = await Challenge.exists({ _id: challengeId });
  if (!challengeExists) throw new ErrorResponse("Challenge not found", 404);

  const user = await User.findById(id);
  if (!user) throw new ErrorResponse("User not found", 404);

  if (
    user.favoriteList.find(
      (challenge) => challenge.challengeRefId.toString() === challengeId
    )
  ) {
    throw new ErrorResponse("Challenge already on favorite list", 409);
  }

  user.readingList.push({ bookRefId: bookId });

  await user.save();

  res.json({
    message: `Successfully added challenge to favorite list`,
    data: user,
  });
};

const updateChallengeStatus = async (req, res) => {
  const { id, challengeId } = req.params;
  const { status } = req.body;

  const challengeExists = await Challenge.exists({ _id: challengeId });
  if (!challengeExists) throw new ErrorResponse("Book not found", 404);

  const user = await User.findOneAndUpdate(
    { _id: id, "favoriteList.challengeRefId": challengeId },
    { $set: { "favoriteList.$.status": status } },
    { new: true, runValidators: true }
  );
  if (!user) throw new ErrorResponse("User not found", 404);

  res.json({ message: `Successfully updated status to ${status}`, data: user });
};

const deleteChallengeFromFavoriteList = async (req, res) => {
  const { id, challengeId } = req.params;

  const challengeExists = await Challenge.exists({ _id: challengeId });
  if (!challengeExists) throw new ErrorResponse("Challenge not found", 404);

  const user = await User.findByIdAndUpdate(
    id,
    { $pull: { favoriteList: { challengeRefId: challengeId } } },
    { new: true, runValidators: true }
  );

  if (!user) throw new ErrorResponse("User not found", 404);
  res.json({
    message: `Successfully removed challenge from favorite list`,
    data: user,
  });
};

export {
  getUserByID,
  getAllUsers,
  createUser,
  updateUserByID,
  deleteUserByID,
  addChallengeToFavoriteList,
  updateChallengeStatus,
  deleteChallengeFromFavoriteList,
};
