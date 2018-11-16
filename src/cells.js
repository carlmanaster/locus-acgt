const charA = 'a'.charCodeAt()

const isFormula = cell => cell.startsWith('=')
const getFormula = cell => cell.substring(1)
const translateCell = (source, destination, cell) => {
  if (!isFormula(cell)) return cell
  let formula = getFormula(cell)
  const references = getReferences(formula)
  references.forEach(r => {
    const r2 = translateReference(source, destination, r)
    formula = formula.replace(r, r2)
  })
  return `=${formula}`
}

const getReferences = formula => {
  return formula.match(/\$?[a-z]{1,2}\$?\d+/gi)
}

const toRowIndex = n => n - 1
const toRow = n => n + 1
const toColumnIndex = prefix => {
  const s = prefix.toLowerCase()
  if (s.length === 1) return s.charCodeAt(0) - charA
  return (s.charCodeAt(0) - charA + 1) * 26 + s.charCodeAt(1) - charA
}
const toColumn = n => {
  let column = String.fromCharCode(n % 26 + charA)
  if (n > 25) {
    column += String.fromCharCode(Math.floor(n / 26) + charA - 1)
  }
  return column
}

const toReference = (coordinates, absoluteRow, absoluteCol) => {
  let row = toRow(coordinates.row)
  if (absoluteRow) row = `$${row}`
  let column = toColumn(coordinates.col)
  if (absoluteCol) column = `$${column}`
  return `${column}${row}`
}

const toCoordinates = reference => {
  const bare = reference.replace(/\$/g, '')
  const firstDigit = bare.search(/\d/)
  const row = toRowIndex(bare.substring(firstDigit))
  const col = toColumnIndex(bare.substring(0, firstDigit))
  return {row, col}
}

const translateReference = (source, destination, reference) => {
  const absoluteCol = reference.startsWith('$')
  const absoluteRow = reference.substring(1).search('\\$') > -1
  const dRow = destination.row - source.row
  const dCol = destination.col - source.col
  const coordinates = toCoordinates(reference)
  if (!absoluteRow) coordinates.row += dRow
  if (!absoluteCol) coordinates.col += dCol
  return toReference(coordinates, absoluteRow, absoluteCol)
}

module.exports = {
  isFormula,
  getFormula,
  translateCell,
  getReferences,
  toRowIndex,
  toColumnIndex,
  toReference,
  toRow,
  toColumn,
  toCoordinates,
  translateReference,
}
