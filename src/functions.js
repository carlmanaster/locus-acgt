const { times } = require('ramda')

const amplicon = (sequence, start, end) => {
  const a = sequence.indexOf(start)
  if (a < 0) return ''
  const b = sequence.indexOf(end, a)
  if (b < 0) return ''
  return sequence.substring(a, b + end.length)
}

// https://droog.gs.washington.edu/parc/images/iupac.html
const iupacAmbiguity = {
  a: 'a',
  c: 'c',
  g: 'g',
  t: 't',
  r: '[ag]',
  y: '[ct]',
  s: '[gc]',
  w: '[at]',
  k: '[gt]',
  m: '[ac]',
  b: '[cgt]',
  d: '[agt]',
  h: '[act]',
  v: '[acg]',
  n: '[acgt]',
}

const iupacRegex = s => {
  const pattern = s
  .toLowerCase()
  .split('')
  .reduce((a, c) => a += iupacAmbiguity[c], '')
  return new RegExp(pattern, "g")
}

const find = (sequence, subsequence) => {
  const re = iupacRegex(subsequence)
  return sequence.toLowerCase().search(re)
}

const count = (sequence, subsequence) => {
  const re = iupacRegex(subsequence)
  return ((sequence.toLowerCase() || '').match(re) || []).length
}

const bases = 'acgt'.split('')
const randomBase = () => bases[Math.floor(4 * Math.random())]
const randomSequence = n => times(randomBase, n).join('')

module.exports = {
  amplicon,
  find,
  count,
  randomSequence
}
