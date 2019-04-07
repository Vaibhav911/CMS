var express = require("express");
var app = express();
// var User = require("./User.js");
var cors = require("cors");
var bodyParser = require("body-parser");
const router = express.Router();
var cookieParser = require("cookie-parser");

var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);

// var Course = require("./notification_schema.js");
var Event = require("./event_schema.js");

// var User = require("./User.js");
var student = require("./student_schema.js");
var Course = require("./course_schema.js");
// var StudentProfile = require("./student_profile_schema.js");
// var CourseMarks = require("./marks_schema.js");
// const StudentProfile = require("./student_profile_schema");
// var Sticky = require("./Sticky_Schema.js");

app.get("/getEvent", (req, res) => {
  //ashish
  Event.find((err, allEvents) => {
    if (err) {
      res.type("html").status(500);
      res.send("Error:" + err);
    } else {
      console.log("from getEvent");
      res.json(allEvents);
    }
  });
});

app.use("/create", (req, res) => {
  var courseId = req.body.courseId;
  var notification = req.body.notification;
  var topic = req.body.topic;
  var date = req.body.date;
  var time = req.body.time;
  console.log("courseId: " + req.body.courseId);
  console.log("no" + notification);
  console.log(date + "hahaah");
  Course.findOne({ courseId: courseId }, (err, course) => {
    if (err) {
      console.log("file not found, " + err);
    } else {
      console.log("file founddd");
      console.log("atlast here");
      console.log(courseId);
      console.log(notification + "haha");
      if (null == course) {
        var file = new Course({
          courseId: courseId,
          notification: {
            notification: notification,
            topic: topic,
            date: date,
            time: time
          }
        });
        console.log(file);
        file.save(err => {
          console.log("atleaset here 345");
          if (err) {
            res.type("html").status(500);
            res.send(err);
          } else {
            res.send("file created successfuly");
          }
        });
      } else {
        course.notification.push({
          notification: notification,
          topic: topic,
          date: date,
          time: time
        });
        console.log("atlast here");
        course.save(err => {
          console.log("atleaset here 368");
          if (err) {
            res.type("html").status(500);
            res.send(err);
          } else {
            res.send("notification created successfuly");
          }
        });
        return 0;
      }
    }
  });
});

app.use("/coursemininotifications", (req, res) => {
  //vaibhav
  var courseId = req.query.courseId;
  Course.find({ courseId: courseId }, (err, course) => {
    if (err) {
      res.send("some error");
    } else {
      console.log(course);
      res.json(course);
    }
  });
});

app.use("/coursecontent", (req, res) => {
  var courseId = req.query.courseId;
  Course.find({ courseId: courseId }, (err, course) => {
    if (err) {
      res.send("some error");
    } else {
      console.log(course);
      res.json(course);
    }
  });
});

app.use("/home", (req, res) => {
  //this wil show all course the sutdent is registered to and other buttons.
  var userId = req.query.studentId;
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
        res.json(student.course);
      }
    });
    console.log("logged in");
  }
});

app.use("/addnote", (req, res) => {
  //vedant
  console.log("request received");
  //var title = req.body.title;
  var content = req.body.content;
  var studentId = req.query.studentId;
  Sticky.findOne({ studentId: studentId }, (err, sticky) => {
    if (err) {
      res.type("html").status(500);
      res.send(err + "afgsdafdgf");
    } else if (!sticky) {
      res.type("html").status(200);
    }
    //check to see if title or content was changed
    else {
      // console.log("in here");
      sticky.studentId = req.query.studentId;
      sticky.content = req.body.content;
      console.log(sticky.content + " fewf");

      //sticky.title = req.body.title;

      // console.log("aabra ka daabra Yay");
      sticky.save(err => {
        if (err) {
          res.type("html").status(500);
          res.send("Error:" + err);
        } else {
          // console.log("aabra ka daabra Yay");
          res.render("notes", { notes: Sticky });
        }
      });
    }
  });
});

app.use("/getcontent", (req, res) => {
  var studentId = req.query.studentId;
  Sticky.findOne({ studentId: studentId }, (err, sticky) => {
    if (err) {
      res.type("html").status(500);
      res.send(err + "afgsdafdgf");
    } else {
      console.log(sticky + " in getcontent");
      res.json(sticky);
    }
  });
});

app.use("/getmarks", (req, res) => {
  var courseId = req.query.courseId;
  console.log("received request, courseId: " + courseId);
  CourseMarks.findOne({ courseId: courseId }, (err, courseMarks) => {
    if (err) {
      console.log("some error");
      res.send("soem error");
    } else {
      //res.send(courseMarks);
      console.log("done fldkjhdsk jjjd");
      res.json(courseMarks);
    }
  });
});

// app.use("/create", (req, res) => {
//   //prakhar
//   var newUser = new User({
//     username: req.body.username,
//     password: req.body.password,
//     designation: req.body.des
//   });

//   newUser.save(err => {
//     if (err) {
//       res.type("html").status(500);
//     } else {
//       res.send(newUser + " created successfully");
//     }
//   });
// });

app.use("/admin", (req, res) => {
  res.redirect("/public/admin.html");
});

app.use("/validate", (req, res) => {
  var user = req.body.username;
  var pass = req.body.password;
  console.log("router");
  User.findOne({ username: user, password: pass }, (err, person) => {
    if (err) {
      res.type("html").status(500);
      res.send("Err...." + err);
    } else if (!person) {
      res.send(
        "LOGIN FAILED :( .. CHECK PASSWORD/USERNAME : " + user + "/" + pass
      );
    } else {
      res.cookie("username", user);
      res.cookie("designation", person.designation);
      res.send("LOGIN SUCCESSFUL");
    }
  });
});

app.use("/deletecookie", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("designation");
  res.send("cookie succesfully deleted ");
});

app.use("/", (req, res) => {
  res.redirect("/public/login.html");
});

router.post("/getCourse", (req, res) => {
  Mark.findOne({ courseName: req.body.cname }, (err, Mark) => {
    if (err) return res.json({ success: false, error: err });
    return res.send({ success: true, course: Mark });
  });
});

router.post("/putMarks", (req, res) => {
  const { course } = req.body;
  Mark.updateOne(
    { courseName: course.courseName },
    { student: course.student },
    err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    }
  );
});

app.use("/getData", (req, res) => {
  //dhruv
  StudentProfile.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    res.json(data);
  });
});

// this is our update method
// this method overwrites existing data in our database
app.use("/updateData", (req, res) => {
  console.log("ashish");
  console.log("body is:" + req.body);
  console.log(req.body.id);
  var id2 = req.body.id;
  console.log(id2);
  var update = req.body.message;
  var name = req.body.name;
  var age = req.body.age;
  var contact = req.body.contact;
  var emailId = req.body.emailId;
  var password = req.body.password;

  console.log("nameis" + name);
  //StudentProfile.findByIdAndDelete(id2, err => {
  //StudentProfile.findOne()
  // if (err) res.send(err);
  //   //res.json({ success: true });
  // });

  // console.log("Id" + id2);
  // console.log("age" + age);
  // let data = new StudentProfile();
  // data.id = id2;
  // data.message = update;
  // data.name = name;
  // data.age = age;
  // data.contact = contact;
  // data.emailId = emailId;
  // data.password = password;
  // console.log("data.age" + data.age);
  // data.save(err => {
  //   if (err) return res.json({ success: false, error: err });
  //   return res.json({ success: true });
  // });
  console.log("here");
  StudentProfile.findOne({ id: id2 }, (err, data) => {
    if (err) {
      console.log("some error2");
    } else {
      console.log("data" + data);
      data.message = update;
      data.name = name;
      data.age = age;
      data.contact = contact;
      data.emailId = emailId;
      data.password = password;
      console.log("final data" + JSON.stringify(data));
      data.save(err => {
        if (err) {
          console.log("some error");
        } else console.log("success");
      });
    }
  });
  /*StudentProfile.findOneAndUpdate(
      { id: id2 },
      {
        message: update,
        name: name,
        age: age,
        contact: contact,
        emailId,
        emailId,
        password,
        password
      },
      err => {
        if (err) res.json({ success: false, error: err });
        res.json({ success: true });
      }
    );*/
});
app.use("/getuserid", (req, res) => {
  console.log("request received at getuserid");
  var userId = req.cookies["username"];
  res.json(userId);
});
// this is our delete method
// this method removes existing data in our database
app.use("/deleteData", (req, res) => {
  console.log("delashish");
  console.log("body" + req.body);
  const { id } = req.body;
  StudentProfile.findByIdAndDelete(id, err => {
    if (err) res.send(err);
    res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
app.use("/putData", (req, res) => {
  let data = new StudentProfile();

  const { id, message, name, age, contact, emailId, password } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.id = id;
  data.message = message;

  data.name = name;
  data.age = age;
  data.contact = contact;
  data.emailId = emailId;
  data.password = password;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
app.listen(process.env.PORT || 5000, () => {
  console.log("I'm there at port 5000");
});
