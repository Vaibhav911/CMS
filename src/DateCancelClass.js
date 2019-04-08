import React, { Component } from "react";

import "./App.css";

class Date extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.action(e.target.value);
  }
  render() {
    return (
      <span style={{ color: "black" }}>
        Enter Date&nbsp;:
        <span style={{ color: "grey" }}>
          {" "}
          <input type="date" name="date" onChange={this.handleChange} />
          <br />
        </span>{" "}
      </span>
    );
  }
}

export default Date;
