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
  const references = formula.match(/\$?[a-z]{1,2}\$?\d+/gi)
  if (!references) return []
  return references
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

const sourceIndex = (index, startRange, entireRange) => {
  const startWidth = 1 + startRange[1] - startRange[0]
  if (startRange[0] === entireRange[0]) {
    return startRange[0] + (index - entireRange[0]) % startWidth
  } else {
    return startRange[1] - (entireRange[1] - index) % startWidth
  }
}

const sourceCellForFill = (r, c, startArea, entireArea) => {
  const [T, L, B, R] = [0, 1, 2, 3]
  const startHeight = startArea[B] - startArea[T] + 1
  const entireHeight = entireArea[B] - entireArea[T] + 1
  const direction = entireHeight > startHeight ? 'vertical' : 'horizontal'

  if (direction === 'vertical') {
    const col = c
    const row = sourceIndex(r, [startArea[T], startArea[B]], [entireArea[T], entireArea[B]])
    return { row, col }
  } else {
    const row = r
    const col = sourceIndex(c, [startArea[L], startArea[R]], [entireArea[L], entireArea[R]])
    return { row, col }
  }
}

const translateChanges = (startArea, entireArea, changes) => {
  changes.forEach(change => {
    const row = change[0]
    const col = change[1]
    const cell = change[3]
    const source = sourceCellForFill(row, col, startArea, entireArea)
    const translated = translateCell(source, {row, col}, cell)
    change[3] = translated
  })
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
  sourceCellForFill,
  sourceIndex,
  translateChanges
}
