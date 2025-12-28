import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    message: String,
    source: {
      type: String,
      enum: ["email", "whatsapp", "form"],
      default: "form",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
