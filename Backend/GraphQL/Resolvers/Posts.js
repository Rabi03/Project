const { AuthenticationError } = require("apollo-server");
const { Error } = require("mongoose");
const Post = require("../../Models/Post");
const CheckAuth = require("../../Util/CheckAuth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getUserActivities(_, { userId }) {
      try {
        const posts = await Post.find({uid: userId}).sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getApps(_, { type,keyword }) {
      try {
        if(keyword){
          const search= await Post.find({ type,appName:{ $regex: keyword,$options:'i'}}).sort({ createdAt: -1 });
          return search
        }
        else{
        const apps = await Post.find({ type: type }).sort({ createdAt: -1 });
        return apps;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(
      _,
      {
        postInput: {
          type,
          appName,
          appType,
          title,
          body,
          groupName,
          groupId,
          appLogo,
          maxMember,
          githubLink,
          images,
          videoLink,
          Link,
          uid,
          username,
        },
      },
      context
    ) {
      // const user = CheckAuth(context);

      const newPost = new Post({
        type,
        appName,
        appType,
        title,
        body,
        groupName,
        groupId,
        appLogo,
        maxMember,
        githubLink,
        images,
        videoLink,
        Link,
        uid,
        username: username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },

    async deletePost(_, { postId }, context) {
      

      try {
        const post = await Post.findById(postId);

        await post.delete();
        return "Post deleted successfully";
      } catch (error) {
        throw new Error(error);
      }
    },

    async likePost(_, { postId, image, color, username }, context) {
      // const { username } = CheckAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username);
          post.likes.push({
            image,
            color,
            username,
            createdAt: new Date().toISOString(),
          });
        } else {
          post.likes.push({
            image,
            color,
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found...");
      }
    },

    async ratePost(_, { postId, value, username }, context) {
      const post = await Post.findById(postId);

      if (post) {
        if (post.rates.find((rate) => rate.username === username)) {
          post.rates = post.rates.filter((rate) => rate.username !== username);
          post.rates.push({
            value,
            username,
            createdAt: new Date().toISOString(),
          });
        } else {
          post.rates.push({
            value,
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found...");
      }
    },
  },
};
