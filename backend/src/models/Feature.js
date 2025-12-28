import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true, // ex: FaHandshake
  },
  color: {
    type: String,
    enum: ["primary", "accent", "gold"],
    default: "primary",
  },
});

export default mongoose.model("Feature", FeatureSchema);
