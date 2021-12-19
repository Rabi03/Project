const { model, Schema } = require("mongoose");

const PostSchema = new Schema({
  type: String,
  appName: String,
  appType: String,
  title: String,
  body: String,
  groupName: String,
  groupId: String,
  appLogo: String,
  maxMember: Number,
  githubLink: String,
  images: [String],
  videoLink: String,
  Link: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      name: String,
      avatar: String,
      createdAt: String,
      replies: [
        {
          body: String,
          username: String,
          name: String,
          avatar: String,
          createdAt: String,
        },
      ],
    },
  ],
  likes: [
    {
      image: String,
      color: String,
      username: String,
      createdAt: String,
    },
  ],
  rates: [
    {
      value: String,
      username: String,
      createdAt: String,
    },
  ],
  uid:String
});

module.exports = model("Post", PostSchema);
