import React from 'react';
// import ReactDOM from 'react-dom';
import { HotTable } from '@handsontable/react';

const {times} = require('ramda')

const bases = 'acgt'.split('')
const randomBase = () => bases[Math.floor(4 * Math.random())]
const randomSequence = n => times(randomBase, n).join('')

class LocusTable extends React.Component {
  constructor(props) {
    super(props);
    this.data = times( () => times (() => randomSequence(10), 5), 10)
  }

  render() {
    return (
      <div id="hot-app">
        <HotTable
          data={this.data}
          colHeaders={true}
          rowHeaders={true}
          width="600"
          height="300"
          stretchH="all"
        />
      </div>
    );
  }
}
export default LocusTable
//
// module.exports = {LocusTable}
