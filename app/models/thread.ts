import mongoose from "mongoose";

const chatThreadSchema = new mongoose.Schema({
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

chatThreadSchema.methods.toString = function() {
  return this.title;
};

module.exports = mongoose.model('ChatThread', chatThreadSchema);
