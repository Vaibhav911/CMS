var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vaibhav:vaibhav@cluster0-txbx7.mongodb.net/test?retryWrites=true"
);

var Schema = mongoose.Schema;

var notificationSchema = new Schema({
  notification: { type: String, required: true },
  date: { type: String, required: true }
});

var fileSchema = new Schema({
  fileName: { type: String, required: true },
  fileLink: { type: String, required: true }
});

var courseSchema = new Schema({
  courseId: { type: String, required: true, unique: true },
  notification: [notificationSchema],
  file: [fileSchema]
});

module.exports = mongoose.model("Course", courseSchema);
