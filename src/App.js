//React imports
import React, { useState, useEffect } from "react"
// custom imports
import TabPivots from "./components/TabPivots"

//Styling
import "./App.css"
//Layout components
//UI components
//License
window.Smart.License = "PUT SMART LICENSE KEY HERE"

class App extends React.Component {
  constructor(props) {
    super(props)

    this.tabsP = React.createRef()
    this.pivottable = React.createRef()
    this.mainContainer = React.createRef()
    this.projectId = "001"
  }

  //handleClick = () => {
  //  this.tabs.current.select(0)
  //}

  init() {}

  componentDidMount() {}

  render() {
    return (
      <TabPivots
        projectId={this.projectId}
        tabs={this.tabsP}
        //
        pivottable={this.pivottable}
        table={this.table}
        mainContainer={this.mainContainer}
      ></TabPivots>
    )
  }
}

export default App
