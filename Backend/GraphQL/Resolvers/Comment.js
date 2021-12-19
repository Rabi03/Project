const { UserInputError, AuthenticationError } = require("apollo-server");
const Post = require("../../Models/Post");
const CheckAuth = require("../../Util/CheckAuth");

module.exports = {
  Mutation: {
    createComment: async (
      _,
      { postId, body, username, name, avatar },
      context
    ) => {
      // const { username } = CheckAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty Comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }
      const post = await Post.findById(postId);

      if (post) {
        post.comments.push({
          body,
          username,
          name,
          avatar,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post nnot found");
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      // const { username } = CheckAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("You can't delete this comment");
        }
      } else throw new UserInputError("Post not found");
    },

    createReply: async (
      _,
      { postId, commentId, body, username, name, avatar },
      context
    ) => {
      // const { username } = CheckAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty Reply", {
          errors: {
            body: "Reply body must not be empty",
          },
        });
      }
      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        post.comments[commentIndex].replies.push({
          body,
          username,
          name,
          avatar,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post/Comment not found");
    },

    deleteReply: async (_, { postId, commentId, replyId }, context) => {
      // const { username } = CheckAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex]) {
          const replyIndex = post.comments[commentIndex].replies.findIndex(
            (r) => r.id === replyId
          );
          if (
            post.comments[commentIndex].replies[replyIndex].username ===
            username
          ) {
            post.comments[commentIndex].replies[replyIndex].splice(
              replyIndex,
              1
            );
            await post.save();
            return post;
          } else {
            throw new AuthenticationError("You can't delete this reply");
          }
        } else throw new UserInputError("Comment not found");
      } else throw new UserInputError("Post not found");
    },
  },
};
