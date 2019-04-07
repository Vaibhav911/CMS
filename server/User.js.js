var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://prakhar:prakhar@login-page-bqjzb.mongodb.net/test?retryWrites=true"
);

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  designation: String
});

module.exports = mongoose.model("User", userSchema);

