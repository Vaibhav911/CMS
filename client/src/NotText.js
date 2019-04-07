import React, { Component } from 'react';

import './App.css';

class NotText extends Component
{
    constructor(props)
    {
        super(props);
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(e)
    {
        this.props.action(e.target.value);
    }
    render()
    {
        return(
            <div>
            <textarea cols="50" value={this.props.notification}   onChange={this.handleChange.bind(this)} rows="10"  style={{backgroundColor: 'yellow', borderRadius: '5px' ,color:"red"}}></textarea>
            </div>
        );
    }
}

export default NotText;