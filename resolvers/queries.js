const Media = require("../models/Media");
const User = require("../models/User");
const UserInfo = require("../models/UserInfo");
const Category = require("../models/Category");

const Query = {
  medias: async (root, ctx) => {
    try {
      return await Media.find()
        .sort({ createdDate: "desc" })
        .populate({ path: "category", model: "Category" });
    } catch (error) {
      console.log("error", error);
    }
  },
  media: async (root, { _id }, ctx) => {
    try {
      return Media.findOne({ _id }).populate({
        path: "category",
        model: "Category"
      });
    } catch (error) {
      console.error("error", error);
    }
  },
  userInfo: async (root, ctx) => {
    try {
      return await UserInfo.find();
    } catch (error) {
      console.error("error", error);
    }
  },
  me: async (root, args, { currentUser }) => {
    if (!currentUser) return null;
    const user = await User.findOne({
      email: currentUser.username
    });
    console.log(currentUser.username);
    return user;
  },
  categories: async (root, args, ctx) => {
    try {
      return await Category.find().populate({ path: "medias", model: "Media" });
    } catch (error) {
      console.error("error", error);
    }
  },
  category: async (root, { _id }, ctx) => {
    try {
      return await Category.findOne({ _id }).populate({
        path: "medias",
        model: "Media"
      });
    } catch (error) {
      console.error("error", error);
    }
  }
};

module.exports = Query;
