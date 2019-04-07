var express = require("express");
var cors=require("cors");

var app = express();

var Course = require("./schema.js");
var Event = require("./event_schema.js");

app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());


app.use('/allcourses',(req,res) =>{
	
	Course.find((err,allCourses) =>{
		if(err){
			res.type('html').status(500);
			res.send('Error:'+err);
		}
		else{
			res.render('showAllCourses',{courses:allCourses});
		} 

	});
});

app.use("/create", (req, res) => {
  var courseId = req.body.courseId;
  var notification = req.body.notification;
  var topic=req.body.topic;
  var date=req.body.date;
  var time=req.body.time;
  console.log("courseId: " + req.body.courseId);
  console.log("no"+notification);
  console.log(date+"hahaah");
  Course.findOne({ courseId: courseId }, (err, course) => {
    if (err) {
      console.log("file not found, " + err);
    } else {
      console.log("file founddd");
      console.log("atlast here");
      console.log(courseId);
      console.log(notification+"haha");
      if (null == course) {
        var file = new Course({
          courseId: courseId,
          notification: {notification:notification,topic:topic,date:date,time:time}
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
        course.notification.push({ notification:notification,topic:topic,date:date,time:time });
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

app.use("/createEvent", (req, res) => {
  var notification = req.body.notification;
  var topic=req.body.topic;
  var date=req.body.date;
  var time=req.body.time;
  console.log("no: "+notification);
  console.log(date + "hahaah");

  var event = new Event({
    topic:topic,
    notification:notification,
    date:date,
    time:time
  });
  event.save(err => {
    console.log("atleaset here 345");
    if (err) {
      res.type("html").status(500);
      res.send(err);
    } else {
      res.send("file created successfuly");
    }
  });

  //Event.push({topic:topic,notification:notification,date:date,time:time });
  
  });

app.get("/course", (req, res) => {
  var courseId = req.query.name;
  console.log("courseidsdcsdsd" + courseId);
  Course.findOne({ courseId: courseId }, (err, course) => {
    if (err) {
      res.type("html").status(500);
      res.send(err);
    } else {
      //console.log(course);
      console.log(course+"namaste\n");
      res.json(course.notification);
    }
  });
});

app.get("/getEvent", (req, res) => {
   Event.find((err,allEvents) =>{
		if(err){
			res.type('html').status(500);
			res.send('Error:'+err);
		}
		else{
			res.json(allEvents);
		} 

	});
});

app.use('/person',(req,res)=>{
	var searchCourse=req.query.name;

	Course.findOne({course:searchCourse},(err,couseid)=>{
		if(err){
			res.type('html').status(500);
			res.send('error:'+err);
		}
		else if(!courseid){
			re.type('html').status(200);
			res.send('no course name'+searchCourse);
		}
		else
		{
			console.log(course+"namaste\n");
			res.render('shownotification',{course:course});
		}
	});
});

app.use('/public',express.static('public'));

app.use('/', (req, res) => {
  res.redirect('/allcourses');
});


app.listen(5000,()=>
	{console.log('listening at 5000');});