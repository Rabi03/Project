const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    type: String!
    appName: String!
    appType: String!
    title: String!
    body: String!
    groupName: String!
    groupId: String!
    appLogo: String!
    maxMember: Int!
    githubLink: String!
    images: [String]!
    videoLink: String!
    Link: String!
    username: String!
    uid:String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    rates: [Rate]!
    commentCount: Int!
    likeCount: Int!
    rateCount: Int!
  }

  type Comment {
    id: ID!
    body: String!
    replies: [Reply]!
    username: String!
    name: String!
    avatar: String!
    createdAt: String!
  }
  type Reply {
    id: ID!
    body: String!
    username: String!
    name: String!
    avatar: String!
    createdAt: String!
  }
  type Rate {
    id: ID!
    value: String!
    username: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    image: String!
    color: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]!
    getPost(postId: ID!): Post!
    getApps(type: String!,keyword: String!): [Post]!
    getUser(userId: ID!): User!
    searchUser(keyword: String!):[User]!
    getUsers:[User]!
    getUserByUsername(username: String!): User!
    getUserActivities(userId:ID!): [Post]!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    fName: String!
    lName: String!
    pic: String!
    github: String!
    profession: [String]!
    ideas: Int!
    projects: Int!
    followers: Int!
    following: [ID]!
    title: String!
    createdAt: String!
    token: String!
    rooms: [Room]!
    activeRooms: [String]!
  }
  type Room {
    roomId: String!
    roomName: String!
    roomPic: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    fName: String!
    lName: String!
    password: String!
    pic: String!
    github: String!
    profession: [String]!
    ideas: Int!
    projects: Int!
    followers: Int!
    following: [ID]!
    title: String!
    rooms: [String]!
  }
  input PostInput {
    type: String!
    appName: String!
    appType: String!
    title: String!
    body: String!
    groupId: String!
    groupName:String!
    appLogo: String!
    maxMember: Int!
    githubLink: String!
    images: [String]!
    videoLink: String
    Link: String!
    uid: String!
    username: String!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(postInput: PostInput): Post!
    addRoom(
      username: String!
      roomId: String!
      roomName: String!
      roomPic: String!
    ): User!

    leaveRoom(userId: ID!,roomId: String!): String!

    setActiveRooms(username: String!, roomId: String!): User!
    deletePost(postId: ID!): String!
    createComment(
      postId: ID!
      body: String!
      username: String!
      name: String!
      avatar: String!
    ): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    createReply(
      postId: ID!
      commentId: ID!
      body: String!
      username: String!
      avatar: String!
      name: String!
    ): Post!
    deleteReply(postId: ID!, commentId: ID!, replyId: ID!): Post!
    likePost(
      postId: ID!
      image: String!
      color: String!
      username: String!
    ): Post!
    ratePost(postId: ID!, value: String!, username: String!): Post!

    followUser(followId: ID!,userId:ID!):User!
    unFollowUser(followId: ID!,userId:ID!):User!

  }
`;
