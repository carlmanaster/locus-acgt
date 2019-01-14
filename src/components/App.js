import React, { Component, } from 'react'
import './App.css'
import 'handsontable/dist/handsontable.full.css'
import { toCellMatrix, } from '../cells'
import LocusTable from './LocusTable'

const cellMap = {
  width: 10,
  height: 20,
  a1: 'tccagggacattcatgcatcgcctt',
  a2: 'tccaggtacattcatgcattgcctt',
  a3: 'cat',
  a4: 'gcc',
  a5: '=AMPLICON(A1, A3, A4)',
  a6: '=BASE(A1, 1)',
  a7: '=COMPLEMENT(A1)',
  a8: '=CONSENSUS(A1:A2)',
  a9: '=COUNT(A1, A3)',
  a10: '=FIND(A1, A3)',
  a11: '=FIRST_DIFFERENCE(A1:A2)',
  a12: '=GC_CONTENT(A1)',
  a13: '=LENGTH(A1)',
  a14: '=MELTING_TEMPERATURE(A1)',
  a15: '=RANDOM_SEQUENCE(30)',
  a16: '=REVERSE_COMPLEMENT(A1)',
  a17: '=REVERSE(A1)',
}
for (let i = 5; i < 18; i++) {
  cellMap[`b${i}`] = cellMap[`a${i}`].slice(1)
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: toCellMatrix(cellMap),
      settings: {
        displayText: false,
        width: 1200,
        height: 220,
      },
    }
  }

  handleChange = (setting, states) => {
    return event => {
      this.setState({
        settings: {
          [setting]: states[event.target.checked ? 1 : 0],
        },
      })
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
          <span className="App-subtitle" style={{ float: 'right', }}>
            <a
              href="https://github.com/carlmanaster/locus-acgt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="GitHub-Mark-Light-32px.png" alt="octocat" />
            </a>
          </span>
        </header>
        <LocusTable
          data={this.state.data}
          name="hot"
          id="hot-id"
          ref="hot-ref"
        />
      </div>
    )
  }
}

export default App
