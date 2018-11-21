const equal = require('assert').deepEqual
const {
  isFormula,
  getFormula,
  translateCell,
  translateReference,
  getReferences,
  toRowIndex,
  toColumnIndex,
  toRow,
  toColumn,
  toReference,
  toCoordinates,
  sourceCellForFill,
  sourceIndex
} = require('./cells')

describe(`cells.js`, () => {
  const a1 = {row: 0, col: 0}
  const b1 = {row: 0, col: 1}
  const a2 = {row: 1, col: 0}
  const z1 = {row: 0, col: 25}
  const aa1 = {row: 0, col: 26}

  describe(`isFormula()`, () => {
    it(`should detect formula`, () => {
      equal(isFormula('=a1'), true)
    })
    it(`should detect non-formula`, () => {
      equal(isFormula('acgt'), false)
    })
  })

  // not sure what it should do when called on a non-formula
  describe(`getFormula()`, () => {
    it(`should return everything after the equals sign`, () => {
      equal(getFormula('=a1'), 'a1')
    })
  })

  describe(`translateReference()`, () => {
    it(`should translate row`, () => {
      equal(translateReference(a1, a2, 'b2'), 'b3')
      equal(translateReference(a2, a1, 'b3'), 'b2')
      equal(translateReference(a1, a2, 'b$2'), 'b$2')
    })
    it(`should translate column`, () => {
      equal(translateReference(a1, b1, 'b2'), 'c2')
      equal(translateReference(b1, a1, 'c2'), 'b2')
      equal(translateReference(a1, b1, '$b2'), '$b2')
    })
  })

  describe(`translateCell()`, () => {
    it(`should return original cell for non-formula`, () => {
      equal(translateCell(a1, a2, 'aaggt'), 'aaggt')
    })
    it(`should translate cell reference within formula`, () => {
      equal(translateCell(a1, a2, '=reverse(b2)'), '=reverse(b3)')
      equal(translateCell(a1, a2, '=reverse($b$2)'), '=reverse($b$2)')
      equal(translateCell(a1, b1, '=reverse(b2)'), '=reverse(c2)')
    })
  })

  describe(`getReferences()`, () => {
    it(`should return list of references`, () => {
      equal(getReferences('=a1+$b$2+sum($aa2:ac$3)'), ['a1','$b$2','$aa2','ac$3'])
    })
    // TODO: row and column references (maybe only as ranges?)
  })

  describe(`toRowIndex()`, () => {
    it(`should get 0 for 1`, () => {
      equal(toRowIndex(1), 0)
    })
  })

  describe(`toRow()`, () => {
    it(`should get 1 for 0`, () => {
      equal(toRow(0), 1)
    })
  })

  describe(`toColumnIndex()`, () => {
    it(`should get 0 for a`, () => {
      equal(toColumnIndex('a'), 0)
    })
    it(`should get 1 for b`, () => {
      equal(toColumnIndex('b'), 1)
    })
    it(`should get 26 for aa`, () => {
      equal(toColumnIndex('aa'), 26)
    })
  })

  describe(`toColumn()`, () => {
    it(`should get a for 0`, () => {
      equal(toColumn(0), 'a')
    })
    it(`should get b for 1`, () => {
      equal(toColumn(1), 'b')
    })
    it(`should get aa for 26`, () => {
      equal(toColumn(26), 'aa')
    })
  })

  describe(`toReference()`, () => {
    it(`should return the correct references`, () => {
      equal(toReference(a1), 'a1')
      equal(toReference(b1), 'b1')
      equal(toReference(a2), 'a2')
      equal(toReference(z1), 'z1')
      equal(toReference(aa1), 'aa1')
    })
  })

  describe(`toCoordinates()`, () => {
    it(`should return the right coordinates`, () => {
      equal(toCoordinates('$a1'), a1)
      equal(toCoordinates('b$1'), b1)
      equal(toCoordinates('$a$2'), a2)
      equal(toCoordinates('z1'), z1)
      equal(toCoordinates('aa1'), aa1)
    })
  })

  describe(`sourceIndex`, () => {
    it(`should apply single index to all elements`, () => {
      equal(0, sourceIndex(1, [0, 0], [0, 5]))
      equal(1, sourceIndex(5, [1, 1], [1, 5]))
    })
    it(`should cycle when filling forward`, () => {
      equal(0, sourceIndex(2, [0, 1], [0, 5]))
      equal(1, sourceIndex(3, [0, 1], [0, 5]))
      equal(0, sourceIndex(4, [0, 1], [0, 5]))
      equal(1, sourceIndex(5, [0, 1], [0, 5]))
    })
    it(`should cycle when filling backward`, () => {
      equal(4, sourceIndex(0, [4, 5], [0, 5]))
      equal(5, sourceIndex(1, [4, 5], [0, 5]))
      equal(4, sourceIndex(2, [4, 5], [0, 5]))
      equal(5, sourceIndex(3, [4, 5], [0, 5]))
    })
    it(`should cycle when filling backward`, () => {
      equal(5, sourceIndex(1, [4, 5], [1, 5]))
      equal(4, sourceIndex(2, [4, 5], [1, 5]))
      equal(5, sourceIndex(3, [4, 5], [1, 5]))
    })
    it(`should work with fractional fill`, () => {
      equal(11, sourceIndex(8, [10, 12], [8, 12]))
      equal(12, sourceIndex(9, [10, 12], [8, 12]))
    })
  })

  describe(`sourceCellForFill()`, () => {
    it(`should drag down`, () => {
      const startArea =  [4, 0, 5, 1]
      const entireArea = [4, 0, 9, 1]
      equal(sourceCellForFill(6, 0, startArea, entireArea), {row: 4, col: 0})
      equal(sourceCellForFill(7, 0, startArea, entireArea), {row: 5, col: 0})
      equal(sourceCellForFill(8, 1, startArea, entireArea), {row: 4, col: 1})
      equal(sourceCellForFill(9, 1, startArea, entireArea), {row: 5, col: 1})
    })
    it(`should drag right`, () => {
      const startArea =  [4, 0, 5, 0]
      const entireArea = [4, 0, 5, 1]
      equal(sourceCellForFill(5, 1, startArea, entireArea), {row: 5, col: 0})
    })
    it(`should drag up`, () => {
      const startArea =  [10, 0, 11, 1]
      const entireArea = [6, 0, 11, 1]
      equal(sourceCellForFill(8, 0, startArea, entireArea), {row: 10, col: 0})
      equal(sourceCellForFill(7, 1, startArea, entireArea), {row: 11, col: 1})
    })
    it(`should drag up (2)`, () => {
      const startArea =  [10, 0, 10, 0]
      const entireArea = [9, 0, 10, 0]
      equal(sourceCellForFill(9, 0, startArea, entireArea), {row: 10, col: 0})
    })
    it(`should drag up (3)`, () => {
      const startArea =  [10, 0, 11, 0]
      const entireArea = [9, 0, 11, 0]
      equal(sourceCellForFill(9, 0, startArea, entireArea), {row: 11, col: 0})
    })
    it(`should drag up (4)`, () => {
      const startArea =  [10, 0, 12, 0]
      const entireArea = [8, 0, 12, 0]
      equal(sourceCellForFill( 8, 0, startArea, entireArea), {row: 11, col: 0})
      equal(sourceCellForFill( 9, 0, startArea, entireArea), {row: 12, col: 0})
    })
    it(`should drag up with fractional increment`, () => {
      const startArea =  [10, 0, 11, 1]
      const entireArea = [9, 0, 11, 1]
      equal(sourceCellForFill(9, 0, startArea, entireArea), {row: 11, col: 0})
    })
    it(`should drag left`, () => {
      const startArea =  [10, 1, 11, 1]
      const entireArea = [10, 0, 11, 1]
      equal(sourceCellForFill(10, 0, startArea, entireArea), {row: 10, col: 1})
    })
  })
})
