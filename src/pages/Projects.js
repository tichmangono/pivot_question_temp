//React imports
import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"

//Styling
import "../App.css"

// mar 25, new methods
//import React, { Component } from "react"
import { Route, BrowserRouter as Router, Switch, Redirect, Link } from "react-router-dom"
/* import pages
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
*/
import { auth } from "../services/firebase"
import { db } from "../services/firebase"

class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: auth().currentUser,
      projects: [],
      content: "",
      readError: null,
      writeError: null,
    }
    this.logout = this.logout.bind(this)
  }

  //logout
  logout() {
    auth()
      .signOut()
      .then((result) => {
        this.setState({
          authenticated: false,
        })
      })
  }
  // ends here

  async componentDidMount() {
    this.setState({ readError: null })
    try {
      db.ref("projects").on("value", (snapshot) => {
        let projects = []
        snapshot.forEach((snap) => {
          projects.push(snap.val())
        })
        this.setState({ projects })
      })
    } catch (error) {
      this.setState({ readError: error.message })
    }
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        })
      }
    })
  }

  render() {
    const { projects } = this.state
    return (
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <h1>My Projects</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            {projects.map((project) => (
              <div key={project.uid} className="card float-left" style={{ width: "18rem", marginRight: "1rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{project.name}</h5>
                  <p className="card-text">{project.description}</p>
                  <button onClick={() => this.removeData(project)} className="btn btn-link">
                    Delete
                  </button>
                  <button onClick={() => this.updateData(project)} className="btn btn-link">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <h1>Add new project here</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-row">
                <input
                  type="hidden"
                  //ref="uid"
                />
                <div className="form-group col-md-6">
                  <label>Name</label>
                  <input
                    type="text"
                    //ref="name"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Description</label>
                  <input
                    type="text"
                    //ref="description"
                    className="form-control"
                    placeholder="Description"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
            <button onClick={this.logout} className="btn btn-primary">
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }

  //helper functions
  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ writeError: null })
    let name = this.refs.name.value
    let description = this.refs.description.value
    let uid = this.refs.uid.value

    // save to db
    //Do an async - await on this later!
    try {
      db.ref("projects").push({
        name: name,
        description: description,
        createdOn: Date.now().toLocaleString(),
        uid: Date.now(),
      })
      //this.setState({ content: "" })
    } catch (error) {
      this.setState({ writeError: error.message })
    }

    if (uid && name && description) {
      const { projects } = this.state
      const devIndex = projects.findIndex((data) => {
        return data.uid === uid
      })
      projects[devIndex].name = name
      projects[devIndex].description = description
      this.setState({ projects })
    } else if (name && description) {
      const uid = new Date().getTime().toString()
      const { projects } = this.state
      projects.push({ uid, name, description })
      this.setState({ projects })
    }

    this.refs.name.value = ""
    this.refs.description.value = ""
    this.refs.uid.value = ""
  }

  removeData = (project) => {
    //remove on DB as well
    //[here]
    const { projects } = this.state
    const newState = projects.filter((data) => {
      return data.uid !== project.uid
    })
    this.setState({ projects: newState })
  }

  updateData = (project) => {
    //update on DB as well
    //[here]
    this.refs.uid.value = project.uid
    this.refs.name.value = project.name
    this.refs.role.value = project.role
  }
}

//ReactDOM.render(<Projects />, document.querySelector("#root"))
export default Projects
