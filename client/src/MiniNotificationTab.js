import React, { Component } from "react";
import "./App.css";
import "./MiniNotificationTab.css";
var axios = require("axios");

class MiniNotificationTab extends Component {
  constructor(props) {
    super(props);
    this.state = { not1: "" };
  }
  componentDidMount() {
    console.log("props Id " + this.props.courseId);
    console.log("mounting component");
    var str =
      "http://localhost:5000/coursemininotifications/?courseId=" +
      this.props.courseId;
    axios.get(str).then(res => {
      console.log(
        "response is immediate " +
          JSON.stringify(
            res.data[0].notification[0] + " " + this.props.courseId
          )
      );
      this.setState({
        not1: JSON.stringify(res.data[0].notification[0].topic)
      });
      this.setState({
        not2: JSON.stringify(res.data[0].notification[0].topic)
      });
      this.setState({
        not3: JSON.stringify(res.data[0].notification[0].topic)
      });
    });
    console.log("done mounting");
    // console.log("curr sate " + JSON.stringify(this.state));
  }
  handleClick() {}
  render() {
    var courseId = this.props.courseId;
    return (
      <div className="box">
        {/* <input type="text" value={courseId} className="course-name" /> */}
        <span className="course-name">
          <a href={"http://localhost:3000/course/?" + courseId}>{courseId}</a>
        </span>
        <p>{this.state.response}</p>
        <p className="nil-height" />
        <a href="google.com">{this.state.not1}</a>
        <p />
        <a href="google.com">{this.state.not2}</a>
        <p />
        <a href="google.com">{this.state.not3}</a>
        <p />
      </div>
    );
  }
}

export default MiniNotificationTab;
