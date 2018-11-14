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
  s: '[cg]',
  w: '[at]',
  k: '[gt]',
  m: '[ac]',
  b: '[cgt]',
  d: '[agt]',
  h: '[act]',
  v: '[acg]',
  n: '[acgt]',
}
const iupacAmbiguityLookup = {
  a: 'a',
  c: 'c',
  g: 'g',
  t: 't',
  ag: 'r',
  ct: 'y',
  cg: 's',
  at: 'w',
  gt: 'k',
  ac: 'm',
  cgt: 'b',
  agt: 'd',
  act: 'h',
  acg: 'v',
  acgt: 'n',
}

const looksLikeDna = s => {
  if (typeof s === 'number') return false
  return s.replace(/[acgtryswkmbdhvn]/gi, '') === ''
}

const iupacRegex = s => {
  const pattern = s
  .toLowerCase()
  .split('')
  .reduce((a, c) => a += iupacAmbiguity[c], '')
  return new RegExp(pattern, "gi")
}

const find = (sequence, subsequence) => {
  const re = iupacRegex(subsequence)
  return sequence.search(re)
}

const count = (sequence, subsequence) => {
  const re = iupacRegex(subsequence)
  return ((sequence || '').match(re) || []).length
}

const bases = 'acgt'.split('')
const randomBase = () => bases[Math.floor(4 * Math.random())]
const randomSequence = n => times(randomBase, n).join('')

const consensusBase = (sequences, index) => {
  const set = new Set()
  sequences.forEach(s => set.add(s.charAt(index)))
  const v = Array.from(set)
  v.sort()
  return iupacAmbiguityLookup[v.join('')]
}

const consensus = sequences => {
  let n = sequences[0].length
  for (let i = 1; i < sequences.length; i++)
    n = Math.min(n, sequences[i].length)
  let result = ''
  for (let i = 0; i < n; i++) {
    result += consensusBase(sequences, i)
  }
  return result
}

const allSame = (sequences, index) => {
  switch(consensusBase(sequences, index)) {
    case 'a':
    case 'c':
    case 'g':
    case 't':
      return true
    default:
      return false
  }
}

const firstDifference = sequences => {
  let n = sequences[0].length
  for (let i = 0; i < n; i++) {
    if (!allSame(sequences, i)) return i
  }
  return -1
}

const meltingTemperature = sequence => {
  if (sequence.length <= 13) {
    const at = count(sequence, 'w')
    const cg = count(sequence, 's')
    return 2 * at + 4 * cg
  }
  const cg = count(sequence, 's')
  return 64.9 + 41 * (cg - 16.4) / sequence.length
}

const gcContent = sequence => 100 * count(sequence, 's') / sequence.length

module.exports = {
  amplicon,
  find,
  count,
  randomSequence,
  consensus,
  firstDifference,
  looksLikeDna,
  meltingTemperature,
  gcContent
}
