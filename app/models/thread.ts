import mongoose, { Schema, Document } from "mongoose";

export interface IThread extends Document {
  title: string;
  createdAt: Date;
}

const ThreadSchema = new Schema<IThread>(
  {
    title: { type: String, required: true },
  },
  { timestamps: true }
);

export const Thread = mongoose.models.Thread || mongoose.model<IThread>("Thread", ThreadSchema);
