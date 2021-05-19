//React imports
import React, { useState, useEffect } from "react"
// custom imports
//Layout components
import { Tabs, TabItem, TabItemsGroup } from "smart-webcomponents-react/tabs"
//UI components
import MyPivot from "./MyPivot"

//License
window.Smart.License = "PUT SMART WINDOW LICENCE NUMBER HERE"

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
          <TabItem label="Pivot - 001">
            <MyPivot
              projectId={this.props.projectId}
              pivotId="001"
              //
              pivottable={this.props.pivottable}
              table={this.props.table}
              mainContainer={this.props.mainContainer}
            ></MyPivot>
          </TabItem>

          <TabItem label="Bullet Draft">"Bullet Draft"</TabItem>
        </Tabs>
      </>
    )
  }
}

export default TabPivots
