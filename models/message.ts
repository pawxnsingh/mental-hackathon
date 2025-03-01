import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  thread: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  sender: "user" | "assistant"; // Define sender type
  message: string;
  response?: string;
  createdAt: Date;
  messageType: "text" | "image" | "audio" | "file"; // Defines type of message
}

export const MessageSchema = new Schema<IMessage>(
  {
    thread: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatThread",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true },
    response: { type: String, default: "Unable to generate response" }, // Optional response
    messageType: {
      type: String,
      enum: ["text", "image", "audio", "file"], // Support for multimedia messages
      default: "text",
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
