import React, { Component } from 'react';

import './App.css';
import './ButtonsForFaculty.css';
import PostNotificationExtraClass from'./ePostNotificationExtraClass.js';
import PostNotificationCancelClass from './PostNotificationCancelClass.js';
import OthersPostNotification from './OthersPostNotification.js';
import GetNotifications  from './getAllNotificationOfCourse.js';


class ButtonsForFaculty extends Component {
    constructor(props)
    {
        super(props);
        this.state={id:0};
        this.handlClick1=this.handlClick1.bind(this);
        this.handleClick2=this.handleClick2.bind(this);
        this.handleClick3=this.handleClick3.bind(this);
        this.handleClick4=this.handleClick4.bind(this);
        this.handleClick5=this.handleClick5.bind(this);
    }

    handlClick1()
    {
        console.log("ha");
        this.setState({id:1});
    }
    handleClick2()
    {
        console.log("ha");
       this.setState({id:2});
    }
    handleClick3()
    {
        console.log("ha");
      this.setState({id:3});
    }
    handleClick4()
    {
        console.log("ha");
        this.setState({id:4});
      
    }
    handleClick5()
    {
        console.log("ha");
        this.setState({id:5});
      
    }

    render() {
        return (
            <div>
            
                
                     <div class="btn-group">
                    
                            <input type="button" class="button1" value="Extra Class" onClick= {this.handlClick1}></input> &nbsp;  

                            
                            <input type="button" class="button1" value="Cancel Class" onClick={this.handleClick2}></input>   &nbsp;

                            
                            <input type="button" class="button1"  value="Others" onClick={this.handleClick3}></input>   &nbsp;
                            <input type="button" class="button1" value="Add Course Material" onClick={this.handleClick4}></input>   &nbsp;
                            <input type="button" class="button1" value="See All Notifications" onClick={this.handleClick5}></input>  &nbsp;

                            
                            </div>   
                        
                
                    {/*<li><a href='#'><span>Add Course Material</span></a></li>
                    <li class='last'><a href='#'><span>Show Course Material</span></a></li>
                    <li class='last'><a href='#'><span>Add Marks</span></a></li>
        <li class='last'><a href='#'><span>Show Marks</span></a></li>*/}
        
                 {this.state.id==1?<PostNotificationExtraClass/>:""}
                 {this.state.id==2?<PostNotificationCancelClass/>:""}
                 {this.state.id==3?<OthersPostNotification />:""}
                 {this.state.id==4?<OthersPostNotification />:""}
                 {this.state.id==5?<GetNotifications />:""}
                 
            
            </div>
        );
    }
}

export default ButtonsForFaculty;
