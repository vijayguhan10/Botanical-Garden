const mongoose = require("mongoose");
const validator = require("validator");
const Credentials = new mongoose.Schema({
  email: {
    type: "string",
    require: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
});
const User = mongoose.model("User", Credentials);
module.exports = User;
