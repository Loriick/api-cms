const Media = require("../models/Media");
const User = require("../models/User");
const UserInfo = require("../models/UserInfo");
const Category = require("../models/Category");
const bcrypt = require("bcrypt");
const { unAuthenticated, createToken } = require("../utils");

const Mutation = {
  addMedia: async (root, { data }, { currentUser }) => {
    try {
      // unAuthenticated(currentUser);

      const category = await Category.findOne({ _id: data.category });
      if (!category) {
        throw new Error("Catégorie non trouvée");
      } else {
        const media = await new Media({
          ...data,
          category: data.category
        }).save();
        return media;
      }
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
      // unAuthenticated(currentUser);
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
    console.log("1", username, email, password);
    try {
      console.log("2gity ", username, email, password);
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
  },
  addCategory: async (root, { data }, { currentUser }) => {
    try {
      // unAuthenticated(currentUser);

      const category = await new Category({
        ...data
      }).save();
      return category;
    } catch (error) {
      console.error("error", error);
      return error;
    }
  },
  updateCategory: async (root, { _id, data }, { currentUser }) => {
    try {
      unAuthenticated(currentUser);

      const updatedCategory = Category.findByIdAndUpdate(
        { _id },
        { $set: { ...data } },
        { new: true }
      );
      return updatedCategory;
    } catch (error) {
      console.error("error", error);
      return error;
    }
  },
  deleteCategory: async (root, { _id }, { currentUser }) => {
    try {
      // unAuthenticated(currentUser);
      const deletedCategory = await Category.findByIdAndDelete({ _id });
      await Media.deleteMany({ category: _id });
      return deletedCategory;
    } catch (error) {
      console.error("error", error);
      return error;
    }
  }
};

module.exports = Mutation;
