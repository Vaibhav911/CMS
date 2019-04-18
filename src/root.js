import React, { Component } from 'react';
import {Redirect} from 'react-router-dom' ; 

class Root extends Component {
    state ={} ;

    renderRedirect =() =>{
        return <Redirect to="/login" />
    }
    render() { 
        return ( <div>
                    {this.renderRedirect()}
                </div> 
        );
    }
}
 
export default Root;