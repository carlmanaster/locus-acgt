import React, { Component } from 'react';
import './App.css';
import 'handsontable/dist/handsontable.full.css';
import { sourceCellForFill, translateCell } from './cells'
import LocusTable from './LocusTable'
import dnaType from './cellTypes/dnaType'
import Handsontable from 'handsontable'

let fillDetails = {}
Handsontable.cellTypes.registerCellType('locus-acgt-dna-sequence', dnaType)
Handsontable.validators.registerValidator('locus-acgt-dna-sequence', dnaType.validator)
Handsontable.hooks.add('modifyAutofillRange', (entireArea, startArea) => {
  fillDetails = {startArea, entireArea}
})

Handsontable.hooks.add('beforeChange', (changes, source) => {
  if (source === 'Autofill.fill') {
    const { startArea, entireArea } = fillDetails
    changes.forEach(change => {
      // eslint-disable-next-line
      const [row, col, oldCell, cell] = change
      const source = sourceCellForFill(row, col, startArea, entireArea)
      const translated = translateCell(source, {row, col}, cell)
      change[3] = translated
    })
  }
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        ['tccagggacattcatgcatcgcctt', '', '', '', '', '', '', '', '', ''],
        ['tccaggtacattcatgcattgcctt', '', '', '', '', '', '', '', '', ''],
        ['cat', '', '', '', '', '', '', '', '', ''],
        ['gcc', '', '', '', '', '', '', '', '', ''],
        ['=AMPLICON(A1, A3, A4)', 'AMPLICON(A1, A3, A4)', '', '', '', '', '', '', '', ''],
        ['=BASE(A1, 1)', 'BASE(A1, 1)', '', '', '', '', '', '', '', ''],
        ['=COMPLEMENT(A1)', 'COMPLEMENT(A1)', '', '', '', '', '', '', '', ''],
        ['=CONSENSUS(A1:A2)', 'CONSENSUS(A1:A2)', '', '', '', '', '', '', '', ''],
        ['=COUNT(A1, A3)', 'COUNT(A1, A3)', '', '', '', '', '', '', '', ''],
        ['=FIND(A1, A3)', 'FIND(A1, A3)', '', '', '', '', '', '', '', ''],
        ['=FIRST_DIFFERENCE(A1:A2)', 'FIRST_DIFFERENCE(A1:A2)', '', '', '', '', '', '', '', ''],
        ['=GC_CONTENT(A1)', 'GC_CONTENT(A1)', '', '', '', '', '', '', '', ''],
        ['=LENGTH(A1)', 'LENGTH(A1)', '', '', '', '', '', '', '', ''],
        ['=MELTING_TEMPERATURE(A1)', 'MELTING_TEMPERATURE(A1)', '', '', '', '', '', '', '', ''],
        ['=RANDOM_SEQUENCE(30)', 'RANDOM_SEQUENCE(30)', '', '', '', '', '', '', '', ''],
        ['=REVERSE_COMPLEMENT(A1)', 'REVERSE_COMPLEMENT(A1)', '', '', '', '', '', '', '', ''],
        ['=REVERSE(A1)', 'REVERSE(A1)', '', '', '', '', '', '', '', ''],
      ],
      // data: times( () => times (() => randomSequence(25), 4), 6),
      settings: {
        displayText: false,
        width: 1200,
        height: 220,
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
            <span className="App-subtitle" style={{float:"right"}}>
              <a href="https://github.com/carlmanaster/locus-acgt" target="_blank">
                <img src="GitHub-Mark-Light-32px.png" alt="octocat"></img>
              </a>
            </span>
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
