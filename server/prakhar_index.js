var express = require("express");
var app = express();
var User = require("./User.js");
// var Mark = require("./Marks.js");
var cors = require("cors");
// const logger = require("morgan");
var bodyParser = require("body-parser");
const router = express.Router();
var cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
// app.use(logger("dev"));
app.use("/api", router);

// app.set("view engine", "ejs");

// app.use("/public", express.static("public"));

app.use("/create", (req, res) => {
  var newUser = new User({
    username: req.body.username,
    password: req.body.password,
    designation: req.body.des
  });

  newUser.save(err => {
    if (err) {
      res.type("html").status(500);
    } else {
      res.send(newUser + " created successfully");
    }
  });
});

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
  // res.send({ sucess: true });
  Mark.findOne({ courseName: req.body.cname }, (err, Mark) => {
    // findOne
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

app.listen(process.env.PORT || 3001, () => {
  console.log("I'm there at port 3001");
});
