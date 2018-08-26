import React, { Component } from 'react';
import './App.css';
import 'handsontable/dist/handsontable.full.css';
import LocusTable from './LocusTable'
import dnaType from './cellTypes/dnaType'
import Handsontable from 'handsontable'

Handsontable.cellTypes.registerCellType('locus-acgt-dna-sequence', dnaType);
Handsontable.validators.registerValidator('locus-acgt-dna-sequence', dnaType.validator);

class App extends Component {
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
        <LocusTable/>
      </div>
    );
  }
}

export default App;
