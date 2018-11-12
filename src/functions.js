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

const find = (sequence, subsequence) => {
  const pattern = subsequence
  .toLowerCase()
  .split('')
  .reduce((a, c) => a += iupacAmbiguity[c], '')
  const re = new RegExp(pattern)
  return sequence.toLowerCase().search(re)
}

module.exports = {
  amplicon,
  find
}
