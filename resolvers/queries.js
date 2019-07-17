const Media = require("../models/Media");
const User = require("../models/User");
const UserInfo = require("../models/UserInfo");

const Query = {
  medias: async (root, ctx) => {
    try {
      return await Media.find().sort({ createdDate: "desc" });
    } catch (error) {
      console.log("error", error);
    }
  },
  media: async (root, { _id }, ctx) => {
    try {
      return Media.findOne({ _id });
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
  }
};

module.exports = Query;
