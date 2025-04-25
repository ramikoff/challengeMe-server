import { Schema, model } from "mongoose";

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
    challengesCompleted: Number,
    totalCredits: Number,
  },
  favoriteChallenges: [],
  activeChallenges: [],
});

const User = model("user", userSchema);

export default User;
