import React from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable'
import dnaType from '../cellTypes/dnaType'
import { translateChanges } from '../cells'
const { forEach } = require('ramda')
const { setReference, getValue } = require('../cellTypes/dnaType').default

let fillDetails = {}
let copyDetails = {}
Handsontable.cellTypes.registerCellType('locus-acgt-dna-sequence', dnaType)
Handsontable.validators.registerValidator('locus-acgt-dna-sequence', dnaType.validator)

Handsontable.hooks.add('modifyAutofillRange', (entireArea, startArea) => {
  fillDetails = { startArea, entireArea }
}, this)

Handsontable.hooks.add('afterCopy', (data, coords) => {
  // TODO: handle multiple area selection; that's why coords is an array
  copyDetails = { coords: coords[0] }
}, this)

Handsontable.hooks.add('beforeChange', (changes, source) => {
  if (source === 'Autofill.fill') {
    const { startArea, entireArea } = fillDetails
    translateChanges(startArea, entireArea, changes)
  }
  if (source === 'CopyPaste.paste') {
    if (!copyDetails.coords) return // if not copying from within this sheet
    const { startRow, startCol, endRow, endCol } = copyDetails.coords
    const startArea = [ startRow, startCol, endRow, endCol ]
    const last = changes.length - 1
    const T = changes[0][0]
    const L = changes[0][1]
    const B = changes[last][0]
    const R = changes[last][1]
    const entireArea = [ T, L, B, R ]
    translateChanges(startArea, entireArea, changes)
  }
}, this)

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
            const cell = this.getSelectedRangeLast().highlight
            const data = this.getDataAtCell(cell.row, cell.col)
            setReference(getValue(this, data))
            this.render()
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
