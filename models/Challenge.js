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
      type: Array,
      required: true,
      validate: {
        validator: function (value) {
          if (this.location.type === "Point") {
            // Za Point treba [[lat, lng]]
            return (
              Array.isArray(value) &&
              value.length === 1 &&
              Array.isArray(value[0]) &&
              value[0].length === 2 &&
              typeof value[0][0] === "number" &&
              typeof value[0][1] === "number"
            );
          }
          if (this.location.type === "Route") {
            return (
              Array.isArray(value) &&
              value.length === 4 &&
              value.every((coord) => typeof coord === "number")
            );
          }
          return false;
        },
        message: (props) =>
          `Invalid coordinates for type "${props.value.type}". Expected ${
            props.value.type === "Point"
              ? "one point [[lat, lng]]"
              : "four coordinates [lat1, lng1, lat2, lng2]"
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
