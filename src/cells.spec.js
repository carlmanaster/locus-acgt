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
})
