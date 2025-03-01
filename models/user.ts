import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  clerkUserId: string;
  name: string;
  email: string;
  preferredLanguage: string;
  onboardingComplete: boolean;
  mentalHealthGoals: string[];
  role: "student" | "counselor";
  gender: "male" | "female";
  createdAt: Date;
  updatedAt: Date;
  dob: Date;
}

// Supported Indian Languages Enum
const IndianLanguagesEnum = [
  "English",
  "Hindi",
  "Bengali",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Marathi",
  "Tamil",
  "Telugu",
  "Urdu",
  "Punjabi",
];

// Define User Schema
const UserSchema = new Schema<IUser>(
  {
    clerkUserId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    preferredLanguage: {
      type: String,
      enum: IndianLanguagesEnum,
      default: "English",
    },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    onboardingComplete: { type: Boolean, default: false },
    mentalHealthGoals: { type: [String], default: [] },
    role: { type: String, enum: ["student", "counselor"], default: "student" },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError
export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
