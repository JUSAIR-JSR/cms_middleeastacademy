import mongoose from "mongoose";

const StatSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Stat", StatSchema);
