const equal = require('assert').deepEqual
const { find } = require('./functions')

describe(`functions.js`, () => {

  describe(`find()`, () => {
    it(`should find a`, () => {
      equal(find('cagt', 'a'), 1)
    })
    it(`should be case-insensitive`, () => {
      equal(find('cagt', 'A'), 1)
    })
    it(`should find r (a or g)`, () => {
      equal(find('cagt', 'r'), 1)
    })
    it(`should find longer string`, () => {
      equal(find('cagt', 'rt'), 2)
    })
    it(`should find n (a or c or g or t)`, () => {
      equal(find('cagt', 'nnnn'), 0)
    })
    it(`should return -1 for not found`, () => {
      equal(find('cagt', 'tnnn'), -1)
    })

  })

})
