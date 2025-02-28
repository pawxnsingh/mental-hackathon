import mongoose from "mongoose";

const chatThreadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255, // enforce a maximum length of 255 characters
    // You can include a comment for help text if needed
    // help: "Thread title or subject"
  }
});

// Optionally, add a method to mimic the __str__ behavior
chatThreadSchema.methods.toString = function() {
  return this.title;
};

export const Thread = mongoose.model('ChatThread', chatThreadSchema);