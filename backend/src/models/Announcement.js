import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["New Batch", "Workshop", "Placement"],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    /* SAME COLOR SYSTEM AS COURSES */
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
      default: "primary",
    },

    shade: {
      type: String,
      enum: ["400", "500", "600"],
      default: "500",
    },

    /* OPTIONAL ICON (NOT REQUIRED) */
    icon: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", AnnouncementSchema);
