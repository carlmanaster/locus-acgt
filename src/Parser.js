const { flatten } = require('ramda')
const { complement, reverse } = require('bionode-seq')
const {
  amplicon,
  find,
  count,
  randomSequence,
  consensus,
  firstDifference,
  meltingTemperature,
  gcContent } = require('./functions')
const { Parser } = require('hot-formula-parser')
const parser = new Parser()

let hot

parser.setHot = h => {hot = h}

parser.on('callCellValue', (cellCoord, callback) => {
  const x = cellCoord.row.index
  const y = cellCoord.column.index
  const data = hot.getData()[x][y]

  if (data[0] !== '=')
    callback(data)
  else {
    const parsed = parser.parse(data.substring(1).toUpperCase())
    callback(parsed.result)
  }
})

parser.on('callRangeValue', function(startCellCoord, endCellCoord, done) {
  const range = []
  const r0 = startCellCoord.row.index
  const r1 = endCellCoord.row.index
  const c0 = startCellCoord.column.index
  const c1 = endCellCoord.column.index

  for (var row = r0; row <= r1; row++) {
    const fragment = [];

    for (var col = c0; col <= c1; col++) {
      const data = hot.getData()[row][col]
      if (data[0] !== '=')
        fragment.push(data)
      else {
        const parsed = parser.parse(data.substring(1).toUpperCase())
        fragment.push(parsed.result)
      }
    }
    range.push(fragment);
  }

  if (range) {
    done(range)
  }
})

parser.on('callFunction', (name, params, done) => {
  switch (name.toUpperCase()) {
    case 'REVERSE_COMPLEMENT':
      done(complement(params[0], true))
      break
    case 'REVERSE':
      done(reverse(params[0]))
      break
    case 'COMPLEMENT':
      done(complement(params[0], false))
      break
    case 'AMPLICON':
      done(amplicon(params[0], params[1], params[2]))
      break
    case 'FIND':
      done(find(params[0], params[1]))
      break
    case 'COUNT':
      done(count(params[0], params[1]))
      break
    case 'RANDOM_SEQUENCE':
      done(randomSequence(params[0]))
      break
    case 'BASE':
      done(params[0].substring(params[1], params[1] + 1))
      break
    case 'LENGTH':
      done(params[0].length)
      break
    case 'CONSENSUS':
      done(consensus(flatten(params[0])))
      break
    case 'FIRST_DIFFERENCE':
      done(firstDifference(flatten(params[0])))
      break
    case 'MELTING_TEMPERATURE':
      done(Math.round(10 * meltingTemperature(params[0])) / 10)
      break
    case 'GC_CONTENT':
      done(Math.round(gcContent(params[0])))
      break
    default:
      break
  }
})

module.exports = {
  parser
}
