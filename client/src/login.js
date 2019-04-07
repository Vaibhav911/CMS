import React, { Component } from "react";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./login.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  valida = (username, password) => {
    // console.log(username + " " + password);
    axios
      .post("http://localhost:5000/validate", {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res.data);
      });
    // console.log("this funvction completed");
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
              <div className="d-flex justify-content-end social_icon" />
            </div>
            <div className="card-body">
              {/* <form action="/validate" method="POST"> */}
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="BITSID"
                  name="username"
                  onChange={e => this.setState({ username: e.target.value })}
                  required
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-key" />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  name="password"
                  onChange={e => this.setState({ password: e.target.value })}
                  required
                />
              </div>
              {/* <div className="row align-items-center remember">
                  <input type="checkbox">Remember Me</input>
                </div> */}
              <div className="form-group">
                {/* <input
                    type="submit"
                    value="Login"
                    className="btn float-right login_btn"
                  /> */}
                <button
                  className="btn btn-warning  login_btn"
                  onClick={() => this.valida(username, password)}
                >
                  Login
                </button>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
