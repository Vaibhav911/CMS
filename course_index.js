var express = require("express");
var app = express();

var Course = require("./course_schema.js");

app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/course", (req, res) => {
  var courseId = req.query.courseId;
  console.log("courseid" + courseId);
  Course.findOne({ courseId: courseId }, (err, course) => {
    if (err) {
      res.type("html").status(500);
      res.send(err);
    } else {
      //console.log(course);
      res.render("course", { course: course });
    }
  });
});

app.use("/addfile", (req, res) => {
  var courseId = req.body.courseId;
  var fileName = req.body.fileName;
  var fileLink = req.body.fileLink;
  Course.findOne({ courseId: courseId }, (err, course) => {
    if (err) {
      console.log("file not found, " + err);
    } else {
      console.log("file founddd");
      console.log("atlast here");

      if (null == course) {
        var file = new Course({
          courseId: courseId,
          file: { fileName: fileName, fileLink: fileLink }
        });
        //console.log(file);
        file.save(err => {
          console.log("atleaset here 3");
          if (err) {
            res.type("html").status(500);
            res.send(err);
          } else {
            res.send("file created successfuly");
          }
        });
      } else {
        course.file.push({ fileName: fileName, fileLink: fileLink });
        console.log("atlast here");
        course.save(err => {
          console.log("atleaset here 3");
          if (err) {
            res.type("html").status(500);
            res.send(err);
          } else {
            res.send("file created successfuly");
          }
        });
        return 0;
      }
    }
  });
});

app.use("/home", (req, res) => {
  query = {};
  Course.find(query, (err, allcourse) => {
    if (err) {
      res.type("html").status(500);
      res.send(err);
    } else {
      res.render("allcourse", { allcourse: allcourse });
    }
  });
});

app.use("/public", express.static("public"));

app.use('/', (req, res) => {
  res.redirect('/home');
});
app.listen(process.env.PORT||3000, () => {
  console.log("listening at port 3000");
});
