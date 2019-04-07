// /client/App.js
import React, { Component } from "react";
import axios from "axios";
import "./label.css";
//import { Button } from "react-bootstrap";
class AdminProfile extends Component {
  // initialize our state
  state = {
    data: [],
    length: [],
    length1: 0,
    id: "weqw",
    message: null,
    /*---- */
    name: null,
    age: 0,
    contact: 0,
    emailId: null,
    password: null,
    /*----*/
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    idToGet: -1,
    objectToUpdate: null
  };

  componentDidMount() {
    console.log("mounting component");
    axios.get("http://localhost:5000/getData").then(res => {
      console.log("here it isr" + res);
      var length = [];
      var i = 0;
      console.log("papa" + res.data.length);
      for (i = 0; i < res.data.length; i++) {
        length.push(i);
      }
      console.log("haha" + length);
      this.setState({
        length: length,
        length1: res.length,
        data: res.data
      });
    });
  }

  putDataToDB = (message, name, age, contact, emailId, password) => {
    let idToBeAdded = this.state.id;

    axios.post("http://localhost:5000/putData", {
      id: idToBeAdded,
      message: message,
      name: name,
      age: age,
      contact: contact,
      emailId: emailId,
      password: password
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("http://localhost:5000/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (
    idToUpdate,
    updateToApply,
    name,
    age,
    contact,
    emailId,
    password
  ) => {
    let objIdToUpdate = null;
    console.log("Id to be updated is", idToUpdate);
    console.log("mama" + this.state.length);
    this.state.length.forEach(dat => {
      if (this.state.data[dat].id == idToUpdate) {
        objIdToUpdate = this.state.data[dat]._id;
      }
    });
    console.log("Name log" + name);
    console.log("Object Id to be updated is", objIdToUpdate);
    axios.post("http://localhost:5000/updateData", {
      id: idToUpdate,

      message: updateToApply,
      name: name,
      age: age,
      contact: contact,
      emailId: emailId,
      password: password

      //update: { name: name }
      /*update2: { age: age },
      update3: { contact: contact },
      update4: { emailId: emailId },
      update5: { password: password }
      update: {
        message: message,
        name: name,
        age: age,
        contact: contact,
        emailId: emailId,
        password: password
      }*/
    });
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    // console.log(data);
    console.log(data);
    console.log("length array:" + this.state.length);
    return (
      <div>
        <ul>
          {this.state.length <= 0
            ? "NO DB ENTRIES YET"
            : this.state.length.map(dat => (
                <li style={{ padding: "10px" }} key={data.id}>
                  <span style={{ color: "gray" }}> id: </span> {data[dat].id}{" "}
                  <br />
                  <span style={{ color: "gray" }}> msg: </span>
                  {data[dat].message}
                  <br />
                  <span style={{ color: "gray" }}> name: </span>
                  {data[dat].name}
                  <br />
                  <span style={{ color: "gray" }}> age: </span>
                  {data[dat].age}
                  <br />
                  <span style={{ color: "gray" }}> contact: </span>
                  {data[dat].contact}
                  <br />
                  <span style={{ color: "gray" }}> emailId: </span>
                  {data[dat].emailId}
                  <br />
                  <span style={{ color: "gray" }}> password: </span>
                  {data[dat].password}
                </li>
              ))}
        </ul>

        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ id: e.target.value })}
            placeholder="Id"
            style={{ width: "400px" }}
          />
          <br />
          <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="Message"
            style={{ width: "400px" }}
          />
          <br />
          {/*---------------------*/}
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="Name"
            style={{ width: "400px" }}
          />
          <br />
          <input
            type="text"
            onChange={e => this.setState({ age: e.target.value })}
            placeholder="Age"
            style={{ width: "400px" }}
          />
          <br />
          <input
            type="text"
            onChange={e => this.setState({ contact: e.target.value })}
            placeholder="Contact"
            style={{ width: "400px" }}
          />
          <br />
          <input
            type="text"
            onChange={e => this.setState({ emailId: e.target.value })}
            placeholder="emailId"
            style={{ width: "400px" }}
          />
          <br />
          <input
            type="text"
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="Password"
            style={{ width: "400px" }}
          />
          <br />
          <button
            class="button button2"
            onClick={() =>
              this.putDataToDB(
                this.state.message,
                this.state.name,
                this.state.age,
                this.state.contact,
                this.state.emailId,
                this.state.password
              )
            }
          >
            ADD
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "400px" }}
            onChange={e => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <br />
          <button
            class="button button2"
            //variant="primary"
            onClick={() => this.deleteFromDB(this.state.idToDelete)}
          >
            {/*Give the Id here*/}
            DELETE
          </button>
        </div>

        <div>
          {/* <input
            type="text"
            style={{ width: "400px" }}
            onChange={e => this.setState({ idToGet: e.target.value })}
            placeholder="put value of the id to get here"
          /> */}
        </div>
      </div>
    );
  }
}

export default AdminProfile;
