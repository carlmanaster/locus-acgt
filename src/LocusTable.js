import React from 'react';
import { HotTable } from '@handsontable/react';
const { forEach } = require('ramda')

const visit = (hot, ranges, fn) => {
  forEach( range => {
    const {start, end} = range
    for (var row = start.row; row <= end.row; row++) {
      for (var col = start.col; col <= end.col; col++) {
        fn(row, col)
      }
    }
  }, ranges)
}

class LocusTable extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props
    this.state = { data }
  }

  render() {
    const contextMenu = {
      callback: function (key, selection, clickEvent) {
        // Common callback for all options
        console.log(clickEvent);
      },
      items: {
        "toggle_stripes": {
          name: 'Toggle Stripes',
          callback: function () {
            const ranges = arguments[1]
            visit(this, ranges, (row, col) => {
              this.setCellMeta(row, col, 'drawStripes', !this.getCellMeta(row, col).drawStripes)
            })
            this.render()
          }
        },
        "set_reference": {
          name: 'Set Reference',
          callback: function () {
            const ranges = arguments[1]
            visit(this, ranges, console.log)
            // console.log('setting cell reference')
            // console.log(`arguments[1]:`, arguments[1])
          }
        },
        // "row_above": {
        //   disabled: function () {
        //     // Disable option when first row was clicked
        //     return this.getSelectedLast()[0] === 0; // `this` === hot3
        //   }
        // },
        // "row_below": {
        //   name: 'Click to add row below' // Set custom text for predefined option
        // },
        // "about": { // Own custom option
        //   name: 'Custom option',
        //   callback: function() { // Callback for specific option
        //     setTimeout(function() {
        //       alert('Hello world!'); // Fire alert after menu close (with timeout)
        //     }, 0);
        //   }
        // }
      }
    }
    const settings = {
      data: this.state.data,
      type: "locus-acgt-dna-sequence",
      colHeaders: true,
      rowHeaders: true,
      width: "1200",
      height: "700",
      stretchH: "all",
      formulas: true,
      manualColumnResize: true,
      contextMenu
    }

    return (
      <div id="hot-app">
        <HotTable
          settings={settings}
        />
      </div>
    );
  }
}
export default LocusTable
