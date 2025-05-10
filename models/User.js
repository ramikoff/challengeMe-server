import { Schema, model, Types } from "mongoose";
import { emailRegex } from "../utils/regex.js";

const FavoriteListEntry = new Schema({
  challengeRefId: {
    type: Schema.Types.ObjectId,
    ref: "challenge",
  },
  status: {
    type: String,
    enum: ["active", "favoritelist"],
    default: "favoritelist",
  },
});

const ActiveChallengesEntry = new Schema({
  challengeRefId: {
    type: Schema.Types.ObjectId,
    ref: "challenge",
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed", "failed"],
    default: "pending",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  progress: {
    type: Number,
    default: 0,
  },
});

const userSchema = new Schema({
  email: {
    type: String,
    match: [emailRegex, "Please provide a valid email address."],
    unique: [true, "User already exists"],
    required: [true, "Please provide an email address"],
    index: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  location: [Number, Number],
  age: {
    type: Number,
  },
  fitnesLevel: {
    type: String,
  },
  frequence: {
    type: String,
  },
  interests: {
    type: String,
  },
  preferredEnvironment: {
    type: String,
  },
  timeBudget: {
    type: Number,
  },
  profilePictureUrl: {
    type: String,
  },
  stats: {
    challengesCompleted: {
      type: Number,
      default: 0,
    },
    totalCredits: {
      type: Number,
      default: 0,
    },
  },
  favoriteList: [FavoriteListEntry],
  activeChallenges: [ActiveChallengesEntry],
});

const User = model("user", userSchema);

export default User;
