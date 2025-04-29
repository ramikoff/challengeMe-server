import { Schema, model, Types } from "mongoose";

const challengeSchema = new Schema({
  challengeTitle: {
    type: String,
    required: true,
  },
  challengeDescription: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  challengeCategory: {
    type: String,
    required: true,
  },
  challengeSubCategory: {
    type: String,
    required: true,
  },
  challengeDetailsUrl: String,
  fitnessLevel: {
    type: String,
    required: true,
  },
  frequence: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    coordinates: [Number, Number],
    required: true,
  },
  challengeReward: {
    type: Number,
    required: true,
  },
  createdBy: Types.ObjectId,
  active: Boolean,
  duration: Number,
});

const Challenge = model("challenge", challengeSchema);

export default Challenge;
