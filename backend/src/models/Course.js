import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    certification: { type: String, required: true },

    placement: {
      type: String,
      default: "Premium Placement Support",
    },

    color: {
      type: String,
      enum: [
        "primary",
        "accent",
        "gold",
        "teal",
        "blue",
        "purple",
        "rose",
        "orange",
        "emerald",
        "cyan",
      ],
      required: true,
    },

    shade: {
      type: String,
      enum: ["400", "500", "600"],
      default: "500",
    },

    icon: {
      type: String,
      required: true,
    },

    /* ✅ NEW */
status: {
  type: String,
  enum: ["draft", "published"],
  default: "draft",
},

  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
