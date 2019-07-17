const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  subtitle: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    unique: true
  },
  facebook: String,
  instagram: String,
  email: String
});

module.exports = mongoose.model("Content", UserInfoSchema);
