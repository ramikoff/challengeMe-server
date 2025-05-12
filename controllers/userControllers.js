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
    .populate(
      "favoriteList.challengeRefId",
      "challengeTitle challengeCategory challengeSubCategory standardLevel"
    )
    .populate(
      "activeChallenges.challengeRefId",
      "challengeTitle challengeCategory challengeSubCategory standardLevel"
    )

    .lean();
  if (!user) throw new ErrorResponse("User not found", 404);
  res.json({ data: user });
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

  user.favoriteList.push({ challengeRefId: challengeId });

  await user.save();

  res.json({
    message: `Successfully added challenge to favorite list`,
    data: user,
  });
};

const addChallengeToActiveChallenges = async (req, res) => {
  const { id, challengeId } = req.params;
  const challengeExists = await Challenge.exists({ _id: challengeId });
  if (!challengeExists) throw new ErrorResponse("Challenge not found", 404);
  const user = await User.findById(id);
  if (!user) throw new ErrorResponse("User not found", 404);
  if (
    user.activeChallenges.find(
      (challenge) => challenge.challengeRefId.toString() === challengeId
    )
  ) {
    throw new ErrorResponse("Challenge already in active challenges", 409);
  }
  user.activeChallenges.push({
    challengeRefId: challengeId,
    status: "in-progress",
    startDate: new Date(),
    progress: 0,
  });
  await user.save();
  res.json({
    message: `Successfully added challenge to active challenges`,
    data: user,
  });
};

const updateChallengeStatus = async (req, res) => {
  const { id, challengeId } = req.params;
  const { status } = req.body;

  const challengeExists = await Challenge.exists({ _id: challengeId });
  if (!challengeExists) throw new ErrorResponse("Challenge not found", 404);

  const user = await User.findOneAndUpdate(
    { _id: id, "favoriteList.challengeRefId": challengeId },
    { $set: { "favoriteList.$.status": status } },
    { new: true, runValidators: true }
  );
  if (!user) throw new ErrorResponse("User not found", 404);

  res.json({ message: `Successfully updated status to ${status}`, data: user });
};

const updateActiveChallengeStatus = async (req, res) => {
  const { id, challengeId } = req.params;
  const { status } = req.body;

  const challengeExists = await Challenge.exists({ _id: challengeId });
  if (!challengeExists) throw new ErrorResponse("Challenge not found", 404);

  const update = {
    $set: {
      "activeChallenges.$.status": status,
    },
  };

  if (status === "completed") {
    update.$inc = { "stats.challengesCompleted": 1 };
  }

  const user = await User.findOneAndUpdate(
    { _id: id, "activeChallenges.challengeRefId": challengeId },
    update,
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
  updateUserByID,
  deleteUserByID,
  addChallengeToFavoriteList,
  addChallengeToActiveChallenges,
  updateChallengeStatus,
  deleteChallengeFromFavoriteList,
  updateActiveChallengeStatus,
};
