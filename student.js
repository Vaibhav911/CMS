//import mongoose from "mongoose";
var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Dhruv:Dhruv@cluster0-j4wz3.mongodb.net/test?retryWrites=true"
);

var Schema = mongoose.Schema;

var studentSchema = new Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },

  contact: { type: Number, required: true },
  emailId: { type: String, required: true }
});

module.exports = mongoose.model("Student", studentSchema);
