import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const chatThreadSchema = new mongoose.Schema({
  // Use UUID as the document _id
  _id: {
    type: String,
    default: uuidv4,
  },
  title: {
    type: String,
    required: true,
    maxlength: 255, // enforce a maximum length of 255 characters
    // You can include a comment for help text if needed
    // help: "Thread title or subject"
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

// Optionally, add a method to mimic the __str__ behavior
chatThreadSchema.methods.toString = function() {
  return this.title;
};

module.exports = mongoose.model('ChatThread', chatThreadSchema);
