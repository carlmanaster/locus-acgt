import React, { Component } from 'react';
import './App.css';
import 'handsontable/dist/handsontable.full.css';
import LocusTable from './LocusTable'
import dnaType from './cellTypes/dnaType'
import Handsontable from 'handsontable'
const { times } = require('ramda')

Handsontable.cellTypes.registerCellType('locus-acgt-dna-sequence', dnaType)
Handsontable.validators.registerValidator('locus-acgt-dna-sequence', dnaType.validator)
// Handsontable.hooks.add('afterRender', () => console.log('afterRender', arguments[0].hot))
// console.log(`Handsontable.hooks:`, Handsontable.hooks)

const bases = 'acgt'.split('')
const randomBase = () => bases[Math.floor(4 * Math.random())]
const randomSequence = n => times(randomBase, n).join('')


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: times( () => times (() => randomSequence(25), 5), 5),
      settings: {
        displayText: false,
        width: 1200,
        height: 220
      }
    }
  }

  handleChange = (setting, states) => {
    // console.log(`this.refs:`, this.refs)
    // console.log(`this.state.data:`, this.state.data)
    return event => {
      this.setState({
        // data: {this.state.data},
        settings: {
          [setting]: states[event.target.checked ? 1 : 0],
        }
      });
      // console.log(`this.state:`, this.state)
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <span className="App-title">Locus&nbsp;</span>
            <span className="App-title adenine">A</span>
            <span className="App-title">&ndash;</span>
            <span className="App-title cytosine">C</span>
            <span className="App-title">&ndash;</span>
            <span className="App-title guanine">G</span>
            <span className="App-title">&ndash;</span>
            <span className="App-title thymine">T&nbsp;</span>
            <span className="App-subtitle">a spreadsheet for sequences</span>
        </header>
        <LocusTable
          data = {this.state.data}
          name = "hot"
          id = "hot-id"
          ref = "hot-ref"
          />
      </div>
    );
  }
}

export default App;
