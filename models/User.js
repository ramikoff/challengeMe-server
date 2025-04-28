import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
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
  favoriteChallenges: [
    {
      type: Types.ObjectId,
      ref: "Challenge",
    },
  ],
  activeChallenges: [
    {
      type: Types.ObjectId,
      ref: "Challenge",
    },
  ],
});

const User = model("user", userSchema);

export default User;
