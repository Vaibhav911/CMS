var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ashish:ashish@cluster0-nemml.mongodb.net/test?retryWrites=true"
);

var Schema = mongoose.Schema;

var notificationSchema = new Schema({
  topic:{type:String},
  notification: { type: String},
  date:{type: String},
  time:{type:String}
});

var courseSchema = new Schema({
  courseId: { type: String, required: true, unique: true },
  notification: [notificationSchema]
});

module.exports = mongoose.model("Course", courseSchema);