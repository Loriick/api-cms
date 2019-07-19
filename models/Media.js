const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  src: {
    type: String,
    required: true
  },
  by: String,
  createdDate: {
    type: Date,
    required: true
  },
  updatedDate: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Media", MediaSchema);
