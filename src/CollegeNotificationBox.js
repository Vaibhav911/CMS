import React, { Component } from "react";
import "./App.css";
import "./CollegeNotificationBox.css";
var axios = require("axios");

class NotificationTab extends Component {
  constructor(props) {
    super(props);
    this.state = { not1: "" };
  }
  componentDidMount() {
    console.log("mounting collegenotification component");
    axios
      .get("https://nameless-shelf-39498.herokuapp.com/getEvent")
      .then(res => {
        console.log("from notificatoin tab " + res.data);
        this.setState({
          not1: JSON.stringify(res.data[0].topic)
        });
        this.setState({
          not2: JSON.stringify(res.data[0].topic)
        });
        this.setState({
          not3: JSON.stringify(res.data[0].topic)
        });
      });
    console.log("done collegenotiication mounting");
    // console.log("curr sate " + JSON.stringify(this.state));
  }
  render() {
    // s
    return (
      <div className="box1">
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

export default NotificationTab;
