import { Schema, model, Types } from "mongoose";

const challengeSchema = new Schema({
  challengeTitle: String,
  challengeDescription: String,
  shortDescription: String,
  challengeCategory: String,
  challengeSubCategory: String,
  challengeDetailsUrl: String,
  fitnessLevel: String,
  frequence: String,
  location: {
    type: String,
    coordinates: [Number, Number],
  },
  challengeReward: Number,
  createdBy: Types.ObjectId,
  active: Boolean,
  duration: Number,
});

const Challenge = model("challenge", challengeSchema);

export default Challenge;
