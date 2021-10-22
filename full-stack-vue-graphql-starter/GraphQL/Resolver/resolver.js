const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateUserToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

module.exports = {
  /** Queries Resolver to Execute the Queries for Feteching the Data */
  Query: {
    /** Get the List of Users */
    getUsers: async (_, args, { User }) => {
      const users = await User.find({}).sort({ joinDate: "Desc" }).populate({
        path: "favorites",
        model: "Post",
      });
      return users;
    },
    /** Get the List of Post */
    getPosts: async (_, args, { Post }) => {
      const posts = await Post.find({}).sort({ createdDate: "Desc" }).populate({
        path: "createdBy",
        model: "User",
      });
      return posts;
    },
  },
  /** Mutations Resolver to Execute the Mutations for Mutate or add/delete/modified the data */
  Mutation: {
    /** Mutate or Create new User */
    signUpUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new error("Username Already Exist!");
      }
      const newUser = await new User({
        username,
        email,
        password,
      }).save();
      return {
        token: generateUserToken(newUser, process.env.SECRET_KEY, "1hr"),
      };
    },
    /** Mutate or verify the Existing User */
    signInUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not Found");
      }
      const isValidPassword = bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Password is not Correct");
      }
      return { token: generateUserToken(user, process.env.SECRET_KEY, "1hr") };
    },
    /** Mutate or Create new Post */
    addPost: async (
      _,
      { title, imageUrl, categories, description, creatorId },
      { Post }
    ) => {
      console.log("Data ", _, Post);
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId,
      }).save();
      return newPost;
    },
  },
};
