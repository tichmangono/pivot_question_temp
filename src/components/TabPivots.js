//React imports
import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"

//Styling
//import "./App.css"
import { GetData } from "../data"
import { db } from "../services/firebase"

//Layout components
import { Button, RepeatButton, ToggleButton, PowerButton } from "smart-webcomponents-react/button"
import { Tabs, TabItem, TabItemsGroup } from "smart-webcomponents-react/tabs"
//UI components

import MyPivot from "./MyPivot_20210730_serverdata_EXAMPLE.js"

//License
window.Smart.License = "PUT KEY HERE"

class TabPivots extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    this.props.tabs.current.select(0)
  }

  init() {}

  componentDidMount() {}

  render() {
    return (
      <>
        <Tabs id="styleTwoTab" className="demoTabsShort" selectionMode="click" selected-index={0}>
          <TabItem label="Pivot - 002">
            <MyPivot projectId={this.props.projectId} pivotId="002"></MyPivot>
          </TabItem>

          <TabItem label="Bullet Draft">
            <MyDraft projectId={this.props.projectId} draftId="002"></MyDraft>
          </TabItem>
        </Tabs>
      </>
    )
  }
}

export default TabPivots

/*          
<TabItem label="Editor">
  <MyEditor projectId={this.props.projectId} draftId="001"></MyEditor>
</TabItem>
*/
