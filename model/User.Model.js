const mongoose = require("mongoose");

const socialSchema = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
});

const UserModel = mongoose.model("user", socialSchema);

module.exports = {
  UserModel,
};
