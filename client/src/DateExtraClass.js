import React, { Component } from 'react';

import './App.css';

class DateExtraClass extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.action(e.target.value);
    }
    render() {
        return (
            <span style={{ color: 'grey' }}>Enter Date:

         <span style={{ color: 'black' }}> <input type="date" name="date" onChange={this.handleChange}></input><br></br></span> </span>
        );
    }
}

export default DateExtraClass;