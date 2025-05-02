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
  standardLevel: {
    type: String,
  },
  frequence: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ["Point", "Route"],
      required: true,
    },
    coordinates: {
      type: [[Number]],
      required: true,
      validate: {
        validator: function (value) {
          if (this.location.type === "Point") {
            return value.length === 1;
          }
          if (this.location.type === "Route") {
            return value.length === 2;
          }
          return false;
        },
        message: (props) =>
          `Invalid coordinates for type "${props.value.type}". Expected ${
            props.value.type === "Point" ? "1 point" : "2 points"
          }.`,
      },
    },
  },
  challengeReward: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: "user",
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const Challenge = model("challenge", challengeSchema);

export default Challenge;
