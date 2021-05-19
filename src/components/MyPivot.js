import React from "react"

import { PivotTable } from "smart-webcomponents-react/pivottable"
import { GetData } from "../data"

//Style Imports
import "smart-webcomponents-react/source/styles/smart.default.css"

class MyPivot extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      gridDataSource: [],
      gridColumns: [],
    }
  }

  //
  data = GetData(25)

  data_raw = [
    {
      available: false,
      date: "Fri Jul 08 2016 00:00:00 GMT-0400 (Eastern Daylight Time) {}",
      firstName: "Beate",
      id: 0,
      lastName: "Ohno",
      name: "Beate Ohno",
      price: 1.75,
      productName: "Espresso Truffle",
      quantity: 3,
      reportsTo: null,
      total: 5.25,
    },
    {
      available: true,
      date: "Mon Jan 25 2016 00:00:00 GMT-0500 (Eastern Standard Time) {}",
      firstName: "Ian",
      id: 1,
      lastName: "Nagase",
      name: "Ian Nagase",
      price: 2.25,
      productName: "Black Tea",
      quantity: 10,
      reportsTo: 8,
      total: 22.5,
    },
    {
      available: false,
      date: "Mon Sep 05 2016 00:00:00 GMT-0400 (Eastern Daylight Time) {}",
      firstName: "Peter",
      id: 2,
      lastName: "Vileid",
      name: "Peter Vileid",
      price: 3.3,
      productName: "Doubleshot Espresso",
      quantity: 8,
      reportsTo: 9,
      total: 26.4,
    },
    {
      available: true,
      date: "Tue Oct 04 2016 00:00:00 GMT-0400 (Eastern Daylight Time) {}",
      firstName: "Shelley",
      id: 3,
      lastName: "Bein",
      name: "Shelley Bein",
      price: 3.25,
      productName: "Espresso con Panna",
      quantity: 7,
      reportsTo: 12,
      total: 22.75,
    },
    {
      available: true,
      date: "Sat Aug 13 2016 00:00:00 GMT-0400 (Eastern Daylight Time) {}",
      firstName: "Andrew",
      id: 4,
      lastName: "Peterson",
      name: "Andrew Peterson",
      price: 3.25,
      productName: "Espresso con Panna",
      quantity: 10,
      reportsTo: 10,
      total: 32.5,
    },
    {
      available: false,
      date: "Mon Apr 25 2016 00:00:00 GMT-0400 (Eastern Daylight Time) {}",
      firstName: "Regina",
      id: 5,
      lastName: "Peterson",
      name: "Regina Peterson",
      price: 3.3,
      productName: "Doubleshot Espresso",
      quantity: 1,
      reportsTo: null,
      total: 3.3,
    },
    {
      available: false,
      date: "Fri Jul 08 2016 00:00:00 GMT-0400 (Eastern Daylight Time) {}",
      firstName: "Beate",
      id: 0,
      lastName: "Ohno",
      name: "Beate Ohno",
      price: 1.75,
      productName: "Espresso Truffle",
      quantity: 3,
      reportsTo: null,
      total: 5.25,
    },
    {
      available: true,
      date: "Mon Jan 25 2016 00:00:00 GMT-0500 (Eastern Standard Time) {}",
      firstName: "Ian",
      id: 1,
      lastName: "Nagase",
      name: "Ian Nagase",
      price: 2.25,
      productName: "Black Tea",
      quantity: 10,
      reportsTo: 8,
      total: 22.5,
    },
    {
      available: false,
      date: "Mon Sep 05 2016 00:00:00 GMT-0400 (Eastern Daylight Time) {}",
      firstName: "Peter",
      id: 2,
      lastName: "Vileid",
      name: "Peter Vileid",
      price: 3.3,
      productName: "Doubleshot Espresso",
      quantity: 8,
      reportsTo: 9,
      total: 26.4,
    },
    {
      available: true,
      date: "Tue Oct 04 2016 00:00:00 GMT-0400 (Eastern Daylight Time) {}",
      firstName: "Shelley",
      id: 3,
      lastName: "Bein",
      name: "Shelley Bein",
      price: 3.25,
      productName: "Espresso con Panna",
      quantity: 7,
      reportsTo: 12,
      total: 22.75,
    },
    {
      available: true,
      date: "Sat Aug 13 2016 00:00:00 GMT-0400 (Eastern Daylight Time) {}",
      firstName: "Andrew",
      id: 4,
      lastName: "Peterson",
      name: "Andrew Peterson",
      price: 3.25,
      productName: "Espresso con Panna",
      quantity: 10,
      reportsTo: 10,
      total: 32.5,
    },
  ]

  designer = true
  freezeHeader = true
  keyboardNavigation = true

  pivotData = new window.Smart.DataAdapter({
    dataSource: this.data,
    //dataFields: ["firstName: string", "lastName: string", "productName: string", "quantity: number", "price: number"],
  })

  columns = [
    {
      label: "First Name",
      dataField: "firstName",
      dataType: "string",
    },
    {
      label: "Last Name",
      dataField: "lastName",
      dataType: "string",
    },
    {
      label: "Product Name",
      dataField: "productName",
      dataType: "string",
    },
    {
      label: "Quantity",
      dataField: "quantity",
      dataType: "number",
    },
    {
      label: "Price",
      dataField: "price",
      dataType: "number",
    },
  ]

  pivotColumns = this.columns.map((col) => {
    if (col.dataType === "string") {
      return {
        label: col.label,
        dataField: col.dataField,
        dataType: col.dataType,
        allowRowGroup: true,
        allowPivot: true,
      }
    }
    if (col.dataType === "number") {
      return {
        label: col.label,
        dataField: col.dataField,
        dataType: col.dataType,
        allowRowGroup: true,
        allowPivot: true,
        summary: "sum",
        summarySettings: {
          prefix: "",
          decimalPlaces: 2,
        },
      }
    }
  })

  makePivotItems = (data) => {
    let gridDataSource = new window.Smart.DataAdapter({
      dataSource: data,
      dataFields: ["firstName: string", "lastName: string", "productName: string", "quantity: number", "price: number"],
    })

    let gridColumns = []
    let drow = data[0]
    for (let key in drow) {
      let dT = typeof drow[key]
      let dF = key.replace("[^a-zA-Z0-9]", "")
      if (dT === "string") {
        gridColumns.push({
          label: key,
          dataType: dT,
          dataField: dF,
          allowRowGroup: true,
          allowPivot: true,
          rowGroup: true,
          pivot: true,
        })
      }
      if (dT === "number") {
        gridColumns.push({
          label: key,
          dataType: dT,
          dataField: dF,
          allowRowGroup: true,
          allowPivot: true,
          rowGroup: true,
          pivot: true,
          summary: "sum",
          summarySettings: {
            prefix: "",
            decimalPlaces: 2,
          },
        })
      }
    }

    console.log("DONE MAPPING: ", gridDataSource, gridColumns)
    this.setState({ gridDataSource, gridColumns })
    return {
      gridDataSource,
      gridColumns,
    }
  }

  init() {}

  async componentDidMount() {
    this.init()
    const getData = () => {
      fetch("data_grid_info2.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          console.log(response)
          return response.json()
        })
        .then((data_json) => {
          console.log(data_json)
          //this.makePivotItems(myJson)
          let gridDataSource = new window.Smart.DataAdapter({
            dataSource: data_json,
          })

          let gridColumns = []
          let drow = data_json[0]
          for (let key in drow) {
            let dT = typeof drow[key]
            let dF = key.replace("[^a-zA-Z0-9]", "")
            if (dT === "string") {
              gridColumns.push({
                label: key,
                dataType: dT,
                dataField: dF,
                allowRowGroup: true,
                allowPivot: true,
                rowGroup: true,
                pivot: true,
              })
            }
            if (dT === "number") {
              gridColumns.push({
                label: key,
                dataType: dT,
                dataField: dF,
                allowRowGroup: true,
                allowPivot: true,
                rowGroup: true,
                pivot: true,
                summary: "sum",
                summarySettings: {
                  prefix: "",
                  decimalPlaces: 2,
                },
              })
            }
          }

          console.log("DONE MAPPING: ", gridDataSource, gridColumns)
          this.setState({ gridDataSource, gridColumns })
          console.log("SET STATE: ", gridDataSource, gridColumns)
          return {
            gridDataSource,
            gridColumns,
          }
        })
    }
    getData()
  }

  componentWillUnmount() {
    //this.unsubscribe()
  }

  render() {
    //if (this.gridDataSource) {
    return (
      <div>
        <div className="demo-description"> This demo showcases the PivotTable designer which is a toolbox that allows customizing of column roles and settings, as well as applying filters.</div>

        <PivotTable //
          id="pivotTable"
          //columns={this.pivotColumns}
          //dataSource={this.pivotData}
          columns={this.state.gridColumns}
          dataSource={this.state.gridDataSource}
          designer={this.designer}
          freezeHeader={this.freezeHeader}
          keyboardNavigation={this.keyboardNavigation}
        ></PivotTable>
      </div>
    )
    //}
  }
}

export default MyPivot
