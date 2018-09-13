import React from 'react';
import { HotTable } from '@handsontable/react';

const {times} = require('ramda')

const bases = 'acgt'.split('')
const randomBase = () => bases[Math.floor(4 * Math.random())]
const randomSequence = n => times(randomBase, n).join('')

class LocusTable extends React.Component {
  constructor(props) {
    super(props);
    this.data = times( () => times (() => randomSequence(100), 10), 30)
  }

  render() {
    return (
      <div id="hot-app">
        <HotTable
          data={this.data}
          type="locus-acgt-dna-sequence"
          colHeaders={true}
          rowHeaders={true}
          width="1200"
          height="700"
          stretchH="all"
        />
      </div>
    );
  }
}
export default LocusTable
