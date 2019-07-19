const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  { toJSON: { virtuals: true } }
);

CategorySchema.virtual("medias", {
  ref: "Media",
  localField: "_id",
  foreignField: "category"
});

module.exports = mongoose.model("Category", CategorySchema);
