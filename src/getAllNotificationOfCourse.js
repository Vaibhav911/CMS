import React, { Component } from "react";
import axios from "axios";

import "./App.css";
//import App from './App.js';
//import './PostNotification.css';
//import DateExtraClass from './DateExtraClass.js';
//import TimeExtraClass from './TimeExtraClass.js';
//import ClassExtraClass from './ClassExtraClass.js';
//import NotText from './NotText.js';

class Happ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      length: [],
      topic: [],
      date: [],
      time: [],
      room: [],
      notification: []
    };
  }

  componentDidMount() {
    console.log("mounting component");

    axios
      .get("https://nameless-shelf-39498.herokuapp.com/course?name=csf210")
      .then(res => {
        var topic = [];
        var notification = [];
        var date = [];
        var time = [];
        var length = [];
        var i = 0;
        for (i = 0; i < res.data.length; i++) {
          topic.push(res.data[i].topic);
          notification.push(res.data[i].notification);
          date.push(res.data[i].date);
          time.push(res.data[i].time);
          length.push(i);
        }

        this.setState({
          topic: topic,
          notification: notification,
          date: date,
          time: time
        });
        this.setState({
          length: length
        });
      });
  }

  render() {
    console.log("topic " + this.state.topic);
    console.log("notification " + this.state.notification);
    console.log("date " + this.state.date);
    console.log("time " + this.state.time);
    console.log("length " + this.state.length);
    const data = this.state.length;
    console.log("l" + data);
    return (
      <div className="PostNotification">
        <header
          className="PostNotification-header"
          style={{ backgroundColor: "white" }}
        >
          <span style={{ color: "red" }}>
            <h2>All Notifications</h2>
            <br />
          </span>
          <span style={{ color: "black" }}> {this.state.data}</span>

          <ul>
            {this.state.length <= 0
              ? "NO DB ENTRIES YET"
              : this.state.length.map(dat => (
                  <li style={{ padding: "10px" }}>
                    <span style={{ color: "gray" }}>
                      <span style={{ color: "black" }}>topic:</span>{" "}
                      {this.state.topic[dat]}
                    </span>
                    <br />
                    <span style={{ color: "gray" }}>
                      {" "}
                      <span style={{ color: "black" }}>notification:</span>{" "}
                      {this.state.notification[dat]}
                    </span>
                    <br />
                    <span style={{ color: "gray" }}>
                      {" "}
                      <span style={{ color: "black" }}>date:</span>{" "}
                      {this.state.time[dat]}
                    </span>
                    <br />
                    <span style={{ color: "gray" }}>
                      {" "}
                      <span style={{ color: "black" }}>time:</span>{" "}
                      {this.state.date[dat]}
                    </span>
                    <br />
                    <hr />
                  </li>
                ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default Happ;
