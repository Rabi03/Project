const postsResolver = require('./Posts');
const usersResolver = require('./Users');
const commentsResolver = require('./Comment');

module.exports = {
  Post: {
    likeCount(parent) {
      return parent.likes.length;
    },
    commentCount(parent) {
      return parent.comments.length;
    },
    rateCount(parent) {
      return parent.rates.length;
    },
  },
  Query: {
    ...postsResolver.Query,
    ...usersResolver.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
    ...commentsResolver.Mutation,
  },
};
