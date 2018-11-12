const amplicon = (sequence, start, end) => {
  const a = sequence.indexOf(start)
  if (a < 0) return ''
  const b = sequence.indexOf(end, a)
  if (b < 0) return ''
  return sequence.substring(a, b + end.length)
}

module.exports = {
  amplicon
}
