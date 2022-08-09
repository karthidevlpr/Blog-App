import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

const resolvers = {
  Query: {
    postListByUser: async (parent, args) => {
        const id = args.userId;
        let userPosts = await Blog.find({user: id, active: true});
        return userPosts
    },
    posts: async (parent, args) => {
        let posts = await Blog.find({active: true});
        return posts
    }
  },

  Post: {
    user: async (parent, args) => {
        const user = await User.findOne({user: parent.user, active: true});
        return user
    }
  },

  Mutation: {
    deletePost: async (parent, args) => {
      const id = args.id;
      const post  = await Blog.findByIdAndUpdate(id, {$set: {active : false, updatedOn: Date.now()}}, {new: true})
      return post;
    }
  }
}
export default resolvers


