const { complement } = require('bionode-seq')
const { Parser } = require('hot-formula-parser')
const parser = new Parser()

let hot

parser.setHot = h => {hot = h}

parser.on('callCellValue', (cellCoord, callback) => {
  callback(hot.getData()[cellCoord.row.index][cellCoord.column.index])
})

parser.on('callFunction', (name, params, done) => {
  switch (name.toUpperCase()) {
    case 'REVERSE_COMPLEMENT':
      done(complement(params[0], true))
  }
})

module.exports = {
  parser
}
