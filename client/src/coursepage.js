import React, { Component } from "react";
import "./App.css";
import NotificationTab from "./CollegeNotificationBox.js";
import TitleBar from "./TitleBar.js";
import CourseMaterialView from "./CourseMaterialView.js";
import "./ePostNotificationExtraClass.css";
import StickyNotes from "./StickyFinal";
import "./MiniNotificationTab.css";
var axios = require("axios");

class CoursePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var course = this.props.history.location.search;
    console.log("its properties are " + course.substr(1));
    return (
      <div>
        <TitleBar />
        <NotificationTab />
        <div style={{ float: "left", padding: 15 }}>
          <CourseMaterialView courseId={course.substr(1)} />
        </div>
        <div style={{ float: "right", padding: 15 }}>
          <StickyNotes />
        </div>
        <div style={{ float: "left", padding: 15 }}>
          <form action="http://localhost:3000/studentperformanceanalysis/?">
            {/*get id from cookie*/}
            <input
              type="submit"
              class="button1"
              value="Performance Analysis"
              // onClick={() => this.putDataToDB(this.state.message)}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default CoursePage;
