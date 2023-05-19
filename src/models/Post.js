const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    short: {
      type: String,
      required: [true, "Short is required!"],
    },
    content: {
      type: String,
      required: [true, "Content is required!"],
    },
    userID: {
      type: String,
      required: [true, "User ID is required!"],
    },
    author: {
      type: String,
      required: [true, "Author is required!"],
    },
    reads: {
      type: Number,
      default: 0,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
