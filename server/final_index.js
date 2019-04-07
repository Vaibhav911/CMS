var express = require("express");
var app = express();
// var User = require("./User.js");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

var cookieParser = require("cookie-parser");
app.use(cookieParser());

var User = require("./User.js");
var student = require("./student_schema.js");
var Course = require("./course_schema.js");
var StudentProfile = require("./student_profile_schema.js");

app.set("view engine", "ejs");

app.use("/public", express.static("public"));

app.listen(3000, () => {
  console.log("listening at 3000");
});

app.use("/validate", (req, res) => {
  var user = req.body.username;
  var pass = req.body.password;
  User.findOne({ username: user, password: pass }, (err, person) => {
    if (err) {
      res.type("html").status(500);
      res.send("Err...." + err);
    } else if (!person) {
      res.send(
        "LOGIN FAILED :( .. CHECK PASSWORD/USERNAME : " + user + "/" + pass
      );
    } else {
      console.log("logged in");
      res.cookie("username", user);
      res.cookie("designation", person.designation);
      res.redirect("/home");
    }
  });
});

app.use("/home", (req, res) => {
  //this wil show all course the sutdent is registered to and other buttons.
  var userId = req.cookies["username"];
  if (!userId) {
    res.redirect("/");
  } else {
    var studentId = userId;
    console.log("studentId" + studentId);
    student.findOne({ studentId: studentId }, (err, student) => {
      if (err) {
        res.type("html").status(500);
        res.send(err + "afgsdafdgf");
      } else {
        console.log("Student" + student);
        res.render("student", { student: student });
      }
    });
    console.log("logged in");
  }
});

app.use("/course", (req, res) => {
  var userId = req.cookies["username"];
  if (!userId) {
    res.redirect("/");
  } else {
    var courseId = req.query.courseId;
    console.log("courseid" + courseId);
    Course.findOne({ courseId: courseId }, (err, course) => {
      if (err) {
        res.type("html").status(500);
        res.send(err);
      } else {
        //console.log(course);
        console.log(course + "namaste\n");
        res.render("showNotification", { course: course });
      }
    });
  }
});

//dhruv's code
app.use("/profile", (req, res) => {
  /*var searchName = req.query.name;*/
  var userId = req.cookies["username"];
  if (!userId) {
    res.redirect("/");
  } else {
    var searchId = userId;
    StudentProfile.findOne({ studentId: searchId }, (err, student) => {
      if (err) {
        res.type("html").status(500);
        res.send("Error:" + err);
      } else if (!student) {
        res.type("html").status(200);
        res.send("No student named:" + searchId);
      } else {
        res.render("studentInfo", { student: student });
      }
    });
  }
});

app.use("/update", (req, res) => {
  var userId = req.cookies["username"];
  if (!userId) {
    res.redirect("/");
  } else {
    var updateId = req.body.username;
    StudentProfile.findOne({ studentId: updateId }, (err, student) => {
      if (err) {
        res.type("html").status(500);
        res.send("Error:" + err);
      } else if (!student) {
        res.type("html").status(200);
        res.send("No Student Named" + updateId);
      } else {
        student.name = req.body.name;
        student.age = req.body.age;

        student.contact = req.body.contact;
        student.emailId = req.body.emailId;

        student.save(err => {
          if (err) {
            res.type("html").status(500);
            res.send("Error:" + err);
          } else {
            res.render("updated", { student: student });
          }
        });
      }
    });
  }
});

app.use("/logout", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("designation");
  res.send("You have been successfully logged out");
});

app.use("/", (req, res) => {
  var userId = req.cookies["username"];
  if (!userId) {
    res.redirect("/public/login.html");
  } else {
    res.redirect("/home");
  }
});
