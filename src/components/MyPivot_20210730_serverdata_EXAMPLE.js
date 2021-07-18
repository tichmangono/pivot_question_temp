import React from "react"

import { PivotTable } from "smart-webcomponents-react/pivottable"

//Style Imports
import "smart-webcomponents-react/source/styles/smart.default.css"
import Button from "smart-webcomponents-react/button"

class MyPivot extends React.Component {
  constructor(props) {
    super(props)
    this.data = []
    this.state = {
      gridDataSource: [],
      gridColumns: [],
    }
    this.pivottable = React.createRef()
    this.loading = React.createRef()
    this.draftData = { testId: "testValue" } // Read in data from database here, from the "drafts/003" node
  }

  designer = true
  freezeHeader = true
  keyboardNavigation = true
  selection = true
  selectionMode = "many"

  handleCellClick = (e) => {
    e.preventDefault()
    console.log("e", e)
    console.log("e.detail.row data", e.detail.row)

    // get row data
    const row = e.detail.row
    console.log("row => ", row)
    const rowInfo = { ...row } //"JSON.stringify(row)"
    const rowId = row.id
    const rowMapArray = Object.keys(rowInfo).map((key) => {
      return key + ":" + rowInfo[key]
    })
    const rowString = "<p>" + rowMapArray.toString() + "</p>"

    console.log("rowMapArray => ", rowMapArray)
    console.log("rowString => ", rowString)
    console.log("rowId, rowInfo => ", rowId, rowInfo)

    // check to see if not already in draftData, then
    console.log("rowId", rowId, "Object.keys(this.draftData)", Object.keys(this.draftData))
    if (rowId in this.draftData) {
      // do nothing, or delete
      console.log("draftData b4", this.draftData)
      console.log("This row ", rowId, ", already exists in bullet draft data, so its deleted.")
      delete this.draftData[rowId]
      console.log("draftData a4", this.draftData)
      this.savePivotDraftData(this.draftData)
      console.log("draftData saved to DB", this.draftData)
    } else {
      console.log("draftData b4", this.draftData)
      console.log("number of items b4", this.draftData.length)
      this.draftData[rowId] = rowString //convert to single string?
      console.log("draftData a4", this.draftData)
      console.log("number of items a4", this.draftData.length)
      this.savePivotDraftData(this.draftData)
      console.log("draftData saved to DB", this.draftData)
    }
  }

  processData = (data) => {
    console.log("Runnning processData...")
    console.log("data", data)

    console.log("data count convert to num", data)

    let gridDataSource = new window.Smart.DataAdapter({
      dataSource: data,
      dataFields: ["First name: string", "Level: string", "Organization: string", "Organization type: string", "Country: string", "count: number"], // Can be fed from props later!
    })

    console.log("DONE MAPPING Data: ", gridDataSource)

    return gridDataSource
  }

  processColumns = (data) => {
    console.log("Runnning processColumns...")
    let columnList = ["First name", "Level", "Organization", "Organization type", "Country", "count"] // Can be fed from props later!
    console.log("data", data)
    console.log("columnList", columnList)

    let gridColumns = []
    console.log("data", data)

    let drow = data[0]
    console.log("drow", drow)

    columnList.forEach((key) => {
      console.log("key", key)
      let dT = typeof drow[key]
      let dF = key.replace("[^a-zA-Z0-9]", "").replace(/\s/g, "")
      if (dT === "string" && key !== "count") {
        gridColumns.push({
          label: key,
          dataType: "string",
          dataField: dF,
          allowRowGroup: true,
          rowGroup: true,
          //allowPivot: true,
          //pivot: true,
        })
      }
      if (dT === "number" || key === "count") {
        gridColumns.push({
          label: key,
          dataType: "number",
          dataField: dF,
          //allowRowGroup: true,
          //rowGroup: true,
          //allowPivot: true,
          //pivot: true,
          summary: "sum",
          summarySettings: {
            prefix: "",
            decimalPlaces: 2,
          },
        })
      }
    })

    console.log("DONE MAPPING Columns: (MYPIVOT - SERVER)", gridColumns)
    return gridColumns
  }

  async componentDidMount() {
    console.log("this.gridDataSource", this.state.gridDataSource)
    console.log("this.gridColumns", this.state.gridColumns)

    const response = await fetch("unicefdata_pivoted.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    const data_json = await response.json()
    console.log("Fetch API from public folder", data_json, "first row", data_json[0])
    let gridDataSource = this.processData(data_json)
    let gridColumns = this.processColumns(data_json)

    console.log("BEFORE SATATE SET: ", this.gridDataSource, this.gridColumns)
    this.setState({ gridDataSource: gridDataSource, gridColumns: gridColumns })

    console.log("SET on STATE ACTUAL: ", this.state.gridDataSource, this.state.gridColumns)
    //that.initPivotTable()
  }

  componentWillUnmount() {}

  render() {
    if (this.state.gridDataSource && this.state.gridColumns) {
      return (
        <>
          <div>
            <div className="demo-description">This demo showcases the PivotTable designer which is a toolbox that allows customizing of column roles and settings, as well as applying filters.</div>
            <PivotTable
              //
              ref={this.pivottable}
              id="pivotTable"
              className="smart-visibility-hidden"
              dataSource={this.state.gridDataSource}
              columns={this.state.gridColumns}
              designer={this.designer}
              freezeHeader={this.freezeHeader}
              keyboardNavigation={this.keyboardNavigation}
              selection={this.selection}
              selectionMode={this.selectionMode}
              onCellClick={this.handleCellClick}
            ></PivotTable>
          </div>
        </>
      )
    } else {
      return <div>No data</div>
    }
  }
}

export default MyPivot
