import React, { Component } from "react";

import "./App.css";

class ClassExtraClass extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    console.log(e);
    this.props.action(e.target.value);
  }
  render() {
    return (
      <span style={{ color: "grey" }}>
        Enter ClassRoom:
        <span>
          <input type="text" name="room" onChange={this.handleChange} />
          <br />
        </span>
      </span>
    );
  }
}

export default ClassExtraClass;
