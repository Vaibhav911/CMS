import React, { Component } from "react";
var axios = require("axios");

class StickyNotes extends Component {
  constructor(props) {
    super(props);
    this.state = { studentId: "", content: "" };
  }

  componentDidMount() {
    var userId;
    axios.get("https://nameless-shelf-39498.herokuapp.com/getuserid").then(res => {
      console.log("user id is " + JSON.stringify(res.data));
      userId = res.data;
    });
    axios.get("https://nameless-shelf-39498.herokuapp.com/getcontent/?studentId=").then(res => {
      this.setState({
        content: res.data.content,
        studentId: res.data.studentId
      });
      console.log("state: " + this.state.content);
    });
    console.log("component mounted" + this.state.content);
    // axios.post('http://localhost:5000/addnote/?studentId=1', {content: this.state.content});
  }
  // componentWillUnmount()
  // {
  //         let studentId = this.state.studentId;
  //         let content =this.state.content;
  //         console.log("shudiuashidsahdo;ijas"+content);

  //     axios.post("http://localhost:5000/addnote/?studentId=1", {
  //         content:content

  //       });
  // }

  onChange(e) {
    this.setState({ content: e.target.value });
    var studentId = this.state.studentId;
    console.log("content in react " + this.state.content);
    axios.post("https://nameless-shelf-39498.herokuapp.com/addnote/?studentId=1", {
      content: this.state.content
    });
  }
  // onClick
  // {

  // }
  render() {
    console.log("statecontent " + this.state.content);
    var str = this.state.content;
    return (
      <div>
        <textarea
          cols="30"
          value={this.state.content}
          onChange={this.onChange.bind(this)}
          rows="24"
          name="content"
          style={{ backgroundColor: "yellow", borderRadius: "5px" }}
        />
        {/* <input type="text" value={this.state.inputVal} onChange={(e) => {this.setState({inputVal: e.target.value})}} onChange={(e) => {this.setState({content: e.target.value})}}/> */}
      </div>
    );
  }
}
export default StickyNotes;
