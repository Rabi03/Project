const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  username: String,
  email: String,
  fName: String,
  lName: String,
  password: String,
  pic: String,
  github: String,
  profession: [String],
  ideas: Number,
  projects: Number,
  followers: Number,
  following: [Schema.Types.ObjectId],
  rooms: [
    {
      roomId: String,
      roomName: String,
      roomPic: String,
    },
  ],
  activeRooms:[String],
  title: String,
  createdAt: String,
});

module.exports = model('User', UserSchema);
