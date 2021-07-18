//React imports
import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
//editor imports
import { MyEditor } from "./components/MyEditor"
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

// custom imports
import TabKanbans from "./components/TabKanbans"
import TabGrids from "./components/TabGrids"
import TabPivots from "./components/TabPivots"
import MyPivot from "./components/MyPivot"

//Styling
import "./App.css"

//License
window.Smart.License = "PUT KEY HERE"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.tabsK = React.createRef()
    this.tabsG = React.createRef()
    this.tabsP = React.createRef()
    this.projectId = "001"
    this.draftId = "001"
  }

  componentDidMount() {}

  render() {
    return (
      <div className="app">
        <br></br>
        <h1>3. Matrix Pivot View</h1>
        <TabPivots projectId={this.projectId} tabs={this.tabsP}></TabPivots>
        <br></br>
      </div>
    )
  }
}

export default App
