const { complement, reverse } = require('bionode-seq')
const { amplicon, find } = require('./functions')
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
    // default: done('')
  }
})

module.exports = {
  parser
}
