import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from "mdbreact";

import Login from "./login.js"; //prakhar

// import TitleBar from "./TitleBar.js"; //dhruv
// import "./BITS.png";
// import "./logoutbutton.css";

import NotificationTab from "./CollegeNotificationBox.js";

import HomePage from "./homepage.js";
import CoursePage from "./coursepage.js";
import ChartFinal from "./FacultyPerformanceGraph";
import StudentPerformanceGraph from "./StudentPerformanceGraph.js";
import StudentProfile from "./StudentProfile.js";
import ButtonsForFaculty from "./ButtonsForFaculty.js";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            exact={true}
            path="/login"
            render={() => (
              <div>
                <Login />
              </div>
            )}
          />
          <Route
            exact={true}
            path="/home"
            render={() => (
              <div>
                <HomePage />
              </div>
            )}
          />
          <Route exact={true} path="/course" component={CoursePage} />
          <Route
            exact={true}
            path="/profile"
            render={() => (
              <div>
                <StudentProfile />
              </div>
            )}
          />
          <Route
            exact={true}
            path="/facultyperformanceanalysis"
            render={() => (
              <div>
                <ChartFinal />
              </div>
            )}
          />
          <Route
            exact={true}
            path="/uploadnotification"
            render={() => (
              <div>
                <CoursePage />
              </div>
            )}
          />
          <Route
            exact={true}
            path="/facultycoursepage"
            render={() => (
              <div>
                <ButtonsForFaculty />
              </div>
            )}
          />
          <Route
            exact={true}
            path="/studentperformanceanalysis"
            render={() => (
              <div>
                <StudentPerformanceGraph />
              </div>
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
