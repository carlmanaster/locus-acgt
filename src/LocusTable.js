import React from 'react';
import { HotTable } from '@handsontable/react';

const {times} = require('ramda')

const bases = 'acgt'.split('')
const randomBase = () => bases[Math.floor(4 * Math.random())]
const randomSequence = n => times(randomBase, n).join('')

class LocusTable extends React.Component {
  constructor(props) {
    super(props);
    this.data = times( () => times (() => randomSequence(80), 5), 10)
    this.data[3][3] = 7
    this.data[2][4] = 'not-sequence'
  }

  render() {
    return (
      <div id="hot-app">
        <HotTable
          data={this.data}
          type="locus-acgt-dna-sequence"
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
