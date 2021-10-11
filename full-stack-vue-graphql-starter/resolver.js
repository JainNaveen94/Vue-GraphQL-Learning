module.exports = {
  Query: {
    getUsers: async (_, args, {User}) => {
      const users = await User.find({}).sort({joinDate: 'Desc'}).populate({
        path : 'favorites',
        model : 'Post'
      });
      return users;
    },
    getPosts: async (_, args, {Post}) => {
      const posts = await Post.find({}).sort({createdDate: 'Desc'}).populate({
        path: 'createdBy',
        model: 'User'
      })
      return posts;
    }
  },
  Mutation: {
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
      return newUser;
    },
    addPost: async (
      _,
      { title, imageUrl, categories, description, creatorId },
      { Post }
    ) => {
      console.log("Data ", _, Post)
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
