const equal = require('assert').deepEqual
const { find, count } = require('./functions')

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

  describe(`count`, () => {
    it(`should count a`, () => {
      equal(count('cagt', 'a'), 1)
    })
    it(`should count r`, () => {
      equal(count('cagt', 'r'), 2)
    })
    it(`should count rr`, () => {
      equal(count('cagt', 'rr'), 1)
    })
    it(`should return 0 for not found`, () => {
      equal(count('cagt', 'tnnn'), 0)
    })
  })

})
