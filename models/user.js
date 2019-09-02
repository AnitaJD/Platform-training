const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  photo: String,
  group: String,
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const profileSchema = mongoose.Schema({
  idUser: { type: ObjectId },
  name: String,
  email: String,
  place: String,
  photo: String,
  group: String,
});

const UserProfile = mongoose.model('UserProfile', profileSchema);

module.exports = { User, UserProfile };
