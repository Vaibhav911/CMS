import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react.js";
var axios = require("axios");
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { dates: [], numStudents: [], numFaculties: [] };
  }
  componentDidMount() {
    axios
      .get("http://nameless-shelf-39498.herokuapp.com/sendadmindashboard")
      .then(res => {
        console.log("in dashboard" + JSON.stringify(res.data));
        var dates = [];
        for (var i = 0; i < res.data.datelogin.length; i++) {
          dates.push(res.data.datelogin[i].date);
        }

        var numStudents = [];
        for (var i = 0; i < res.data.datelogin.length; i++) {
          numStudents.push(res.data.datelogin[i].studentCount);
        }

        var numFaculties = [];
        for (var i = 0; i < res.data.datelogin.length; i++) {
          numFaculties.push(res.data.datelogin[i].facultyCount);
        }

        //   var numStudents = res.data.datelogin.studentCount;
        //   var numFaculties = res.data.datelogin.facultyCount;
        //   var date = res.data.datelogin.date;

        this.setState({
          dates: dates,
          numStudents: numStudents,
          numFaculties: numFaculties
        });
        //console.log('reswpone ' + this.state.len);

        var data = [];
        var obj = {
          type: "column",
          name: "Student",
          showInLegend: true,
          toolTipContent: "Student : {y}"
        };

        var dataPoints = [];

        for (var i = 0; i < res.data.datelogin.length; i++) {
          var coordinate = { label: dates[i], y: numStudents[i] };
          dataPoints.push(coordinate);
        }

        obj.dataPoints = dataPoints;
        data.push(obj);

        var obj = {
          type: "column",
          name: "Faculty",
          axisYType: "secondary",
          showInLegend: true
          //toolTipContent: "SId {x} : {y}"
        };

        var dataPoints = [];

        for (var i = 0; i < res.data.datelogin.length; i++) {
          var coordinate = { label: dates[i], y: numFaculties[i] };
          dataPoints.push(coordinate);
        }

        obj.dataPoints = dataPoints;
        data.push(obj);

        this.setState({ data: data });
        console.log("data object " + JSON.stringify(data));
      });
  }
  render() {
    console.log("our object" + JSON.stringify(this.state.data));
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      colorSet: "greenshades",
      theme: "dark2", // "light1", "dark1", "dark2"
      title: {
        fontColor: "yellow",
        text: "Dashboard"
      },
      toolTip: {
        shared: true
      },
      axisY: {
        title: "Student",
        //includeZero: false,
        labelFontColor: "cyan"
        //suffix: "%"
      },
      axisY2: {
        title: "Faculty",
        //includeZero: false,
        labelFontColor: "yellow"
        //suffix: "%"
      },

      axisX: {
        title: "Date",
        labelFontColor: "cyan",
        prefix: "Date:",
        interval: 1
      },
      data: this.state.data
    };
    console.log("there obj " + JSON.stringify(options.data));
    return (
      <div>
        <CanvasJSChart options={options} onRef={ref => (this.chart = ref)} />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default Dashboard;
