const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let ObjectId = require("mongodb").ObjectId;

const { UserInputError, addErrorLoggingToSchema } = require("apollo-server");

const { SECRET_KET } = require("../../config");

const User = require("../../Models/User");

const generateToken = (res) => {
  return jwt.sign(
    {
      id: res.id,
      email: res.email,
      fName: res.fName,
      lName: res.lName,
      username: res.username,
      photoUrl: res.pic,
      profession:res.profession
    },
    SECRET_KET,
    { expiresIn: "3h" }
  );
};

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
        
      } catch (error) {
        throw new Error(error);
      }
    },
    async searchUser(_,{keyword}) {
      try {
        const users = await User.find({username:{ $regex: keyword,$options:'i'}});
        return users;
        
      } catch (error) {
        throw new Error(error);
      }
    },
    async getUser(_, { userId }) {
      try {
        const user = await User.findById(userId);
        if (user) {
          return user;
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getUserByUsername(_, { username }) {
      try {
        const user = await User.findOne({ username });
        if (user) {
          return user;
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    async register(
      _,
      {
        registerInput: {
          username,
          email,
          fName,
          lName,
          password,
          pic,
          github,
          profession,
          ideas,
          projects,
          followers,
          following,
          rooms,
          title,
        },
      },
      context,
      info
    ) {
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is alrady taken",
          },
        });
      }
      password = await bcrypt.hash(password, 12);

      const NewUser = new User({
        username,
        email,
        fName,
        lName,
        password,
        pic,
        github,
        profession,
        ideas,
        projects,
        followers,
        following,
        rooms,
        title,
        createdAt: new Date().toISOString(),
      });
      const res = await NewUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    async login(_, { username, password }) {
      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError("User is not found", {
          errors: {
            username: "User is not found",
          },
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new UserInputError("Wrong Password", {
          errors: {
            password: "Wrong Password",
          },
        });
      }
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async addRoom(_, { username, roomId, roomName, roomPic }) {
      const user = await User.findOne({ username });
      if (user) {
        user.rooms.push({
          roomId,
          roomName,
          roomPic,
        });
        await user.save();
        return {
          ...user._doc,
          id: user._id,
        };
      } else throw new Error("User not found");
    },
    async leaveRoom(_, { userId, roomId }) {
      const user=await User.findById(userId);
      if(user){
        user.rooms=user.rooms.filter(room =>room.roomId !== roomId);
        await user.save();

        return "Successfully Leave Room"
      }
      else throw new Error("User not found");
    },
    async setActiveRooms(_, { username, roomId }) {
      const user = await User.findOne({ username });
      if (user) {
        if (user.activeRooms.includes(roomId) === false) {
          user.activeRooms.push(roomId);
          await user.save();
          return {
            ...user._doc,
            id: user._id,
          };
        }
      } else throw new Error("User not found");
    },

    async followUser(_,{followId,userId}) {
      const user = await User.findById(userId)
      const followUser=await User.findById(followId)

      if(user) {
        user.following.push(followId);

      followUser.followers=followUser.followers+1

      await user.save();
      await followUser.save()
        return{
          ...user._doc,
          id: user._id,
        }
      }
    },
  async unFollowUser(_,{followId,userId}) {
    const user = await User.findById(userId)
    const followUser=await User.findById(followId)

    if(user) {
      user.following.splice(user.following.indexOf(followId),1);
      followUser.followers=followUser.followers-1

      await user.save();
      await followUser.save()
      return{
        ...user._doc,
        id: user._id,
      }
    }
  }
},
};
