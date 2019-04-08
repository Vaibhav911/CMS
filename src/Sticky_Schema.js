var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vedant:vedant@cluster0-oqm4m.mongodb.net/test?retryWrites=true"
);

var Schema = mongoose.Schema;

var StickySchema = new Schema({
  studentId: { type: String, required: true, unique: true },
  title: { type: String },
  content: { type: String }
});

module.exports = mongoose.model("Sticky", StickySchema);
