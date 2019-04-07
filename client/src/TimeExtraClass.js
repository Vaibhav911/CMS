import React, { Component } from 'react';

import './App.css';

class TimeExtraClass extends Component
{
    constructor(props)
    {
        super(props);
        this.handlesChange=this.handlesChange.bind(this);
    }
    handlesChange(e)
    {
        console.log(this.action);
        this.props.action(e.target.value);
    }
    render()
    {
        return(
            <span style={{color:'grey'}}>Enter Time:
            
         <span style={{color:'red'}}> <input type="time" name="time" onChange={this.handlesChange}></input><br></br></span> </span>
        );
    }
}

export default TimeExtraClass;