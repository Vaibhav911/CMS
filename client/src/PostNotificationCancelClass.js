import React, { Component } from 'react';
import axios from "axios";

import './App.css';
import './PostNotificationCancelClass.css';
//import './PostNotification.css';
import DateCancelClass from './DateCancelClass.js';
import NotText from './NotText.js';

class PostNotificationCancelClass extends Component {
  constructor(props)
  {
      super(props);
      
      this.state={topic:"Cancel class",date:"date",notification: "Dear Students,\n "};
    
      this.changeDate=this.changeDate.bind(this);
      this.changeText=this.changeText.bind(this);
  }
  changeDate(date)
  {
      
      this.setState({date:date,notification:" DearStudents,\n There is an Cancellation of Class on "+date,topic:"Cancellation of class on "+date});
  }
  changeText(e)
  {
    this.setState({notification:e});
  }
 
  putDataToDB = message => {
    let topic = this.state.topic;
    let notification =this.state.notification;
    let date=this.state.date;
    let time=this.state.time;
    let course="csf210";
    

    axios.post("/create", {
      courseId:course,
      notification:notification,
      topic:topic,
      date:date,
      time:time
    });
  };

  render() {
    return (
      <div className="PostNotification">
        <header className="PostNotification-header" style={{backgroundColor:'white'}}>
            <span style={{color:'red'}}><h2>Post Notification For Cancelling Class</h2></span>
            <span style={{color:'grey'}}><span style={{color:'black'}}>Topic&nbsp;&nbsp;&nbsp; :-</span> {this.state.topic}<br></br></span>
            <DateCancelClass date={this.state.date} action={this.changeDate}/>
            <span style={{color:'black'}}>Resulted Notification:<br></br></span>
            
            <NotText notification={this.state.notification} action={this.changeText}/>
            
           

            <span > <input type="button" value="post it!" class="button1" onClick={() => this.putDataToDB(this.state.message)} ></input> </span>
        
          
          
        
          
        </header>
      </div>
    );
  }
}


export default PostNotificationCancelClass;

