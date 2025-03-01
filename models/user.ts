import mongoose, { Schema, Document } from "mongoose";

// Define User Interface
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

// Define Supported Indian Languages Enum
const IndianLanguagesEnum = {
  values: [
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
  ],
  message: "Invalid Indian Language",
};

// Define User Schema
const UserSchema = new Schema<IUser>(
  {
    clerkUserId: { type: String, required: true, unique: true }, // Clerk User ID for authentication
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    preferredLanguage: {
      type: String,
      enum: IndianLanguagesEnum.values,
      default: "English",
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    onboardingComplete: {
      type: Boolean,
      default: false,
    },
    mentalHealthGoals: {
      type: [String], // Array of mental health goals
      default: [],
    },
    role: {
      type: String,
      enum: ["student", "counselor"],
      default: "student",
    },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });

export const User =  mongoose.model<IUser>("User", UserSchema);
