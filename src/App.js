import React, { Component } from 'react';
import './App.css';
import 'handsontable/dist/handsontable.full.css';
import LocusTable from './LocusTable'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <span className="App-title">Locus&nbsp;</span>
            <span className="App-title-a">A</span>
            <span className="App-title">&ndash;</span>
            <span className="App-title-c">C</span>
            <span className="App-title">&ndash;</span>
            <span className="App-title-g">G</span>
            <span className="App-title">&ndash;</span>
            <span className="App-title-t">T&nbsp;</span>
            <span className="App-subtitle">a spreadsheet for sequences</span>
        </header>
        <LocusTable/>
      </div>
    );
  }
}

export default App;
