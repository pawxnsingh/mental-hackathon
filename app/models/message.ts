import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  thread: mongoose.Schema.Types.ObjectId;
  sender: "user" | "assistant"; // Define sender type
  message: string;
  response?: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    thread: { type: mongoose.Schema.Types.ObjectId, ref: "Thread", required: true },
    sender: { type: String, enum: ["user", "assistant"], required: true },
    message: { type: String, required: true },
    response: { type: String }, // Optional response
  },
  { timestamps: true }
);

export const Message = mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);
