import React, { Component } from "react";
import Calculations from "./FacultyGraphCalculations.js";
import FacultyChart from "./FacultyChart.js";

class ChartFinal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <FacultyChart app={this.state.app} />
        <Calculations calculation={this.state.calculation} />
      </div>
    );
  }
}

export default ChartFinal;
