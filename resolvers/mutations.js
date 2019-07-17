const Media = require("../models/Media");
const User = require("../models/User");
const UserInfo = require("../models/UserInfo");
const bcrypt = require("bcrypt");
const { unAuthenticated, createToken } = require("../utils");

const Mutation = {
  addMedia: async (root, { data }, { currentUser }) => {
    try {
      unAuthenticated(currentUser);
      const media = await new Media({
        ...data
      }).save();
      return media;
    } catch (error) {
      console.error("error", error);
    }
  },
  updateMedia: async (root, { _id, data }, { currentUser }) => {
    try {
      unAuthenticated(currentUser);
      const updatedMedia = await Media.findOneAndUpdate(
        { _id },
        { $set: { ...data } },
        { new: true }
      );
      return updatedMedia;
    } catch (error) {
      console.error("error", error);
    }
  },
  deleteMedia: async (root, { _id }, { currentUser }) => {
    try {
      unAuthenticated(currentUser);
      const deleteMedia = await Media.findOneAndDelete({ _id });
      return deleteMedia;
    } catch (error) {
      console.error("error", error);
    }
  },
  addUserInfo: async (root, { data }, { currentUser }) => {
    try {
      unAuthenticated(currentUser);
      const userInfo = await new userInfo({
        ...data
      }).save();
      return userInfo;
    } catch (error) {
      console.error("error", error);
    }
  },
  updateUserInfo: async (root, { _id, data }, { currentUser }) => {
    try {
      unAuthenticated(currentUser);
      const updatedUserInfo = await UserInfo.findOneAndUpdate(
        { _id },
        { $set: { ...data } },
        { new: true }
      );
      return updatedUserInfo;
    } catch (error) {
      console.error("error", error);
    }
  },
  signupUser: async (root, { data: { username, email, password } }, ctx) => {
    try {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const neweMail = email.toLowerCase();
      const newUser = new User({
        username,
        email: neweMail,
        password: hashedPassword
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    } catch (error) {
      console.error("error", error);
    }
  },
  signinUser: async (root, { data: { username, password } }, ctx) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("Username/Password is invalid");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Username/Password is invalid");
      }
      return { token: createToken(user, process.env.SECRET, "1hr") };
    } catch (error) {
      console.error("error", error);
    }
  }
};

module.exports = Mutation;
