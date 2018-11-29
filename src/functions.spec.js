const equal = require('assert').deepEqual
const { find, count, meltingTemperature, matchesAmbiguously } = require('./functions')

const close = (actual, expected, tolerance) => {
  equal(true, Math.abs(expected - actual) < tolerance, `${actual} not close enough to ${expected}`)
}
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

  describe(`count()`, () => {
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

  describe(`meltingTemperature()`, () => {
    it(`should get the right values for short sequences`, () => {
      close(meltingTemperature('gtcgctcaaatg'), 36.0, 0.1)
      close(meltingTemperature('ggaaggatcccc'), 40.0, 0.1)
      close(meltingTemperature('tgagagacgacc'), 38.0, 0.1)
      close(meltingTemperature('ctgttagtcata'), 32.0, 0.1)
      close(meltingTemperature('tccgtaaacctg'), 36.0, 0.1)
    })

    it(`should get the right values for long sequences`, () => {
      close(meltingTemperature('gtcgctcaaatgatcatacaagtga'), 54.4, 0.1)
      close(meltingTemperature('ggaaggatcccccattctaaaaccc'), 59.3, 0.1)
      close(meltingTemperature('tgagagacgaccaaatacagaacac'), 56.0, 0.1)
      close(meltingTemperature('ctgttagtcatagagaccagtactt'), 54.4, 0.1)
      close(meltingTemperature('tccgtaaacctgtcgagcctgtctt'), 59.3, 0.1)
    })

  })

  describe(`matchesAmbiguously()`, () => {
    it(`should work`, () => {
      equal(matchesAmbiguously('a', 'a'), true)
      equal(matchesAmbiguously('a', 'r'), true)
      equal(matchesAmbiguously('a', 's'), false)
    })
  })
})
