import Handsontable from 'handsontable'

const { checkType } = require('bionode-seq')
const { parser } = require('../Parser')
const { looksLikeDna, matchesAmbiguously } = require('../functions')

// eslint-disable-next-line
const validator = function(value, callback) {
  // TODO: Maybe apply parser here?
  if (value == null) {
    value = '';
  }
  if (this.allowEmpty && value === '') {
    callback(true);

  } else if (value === '') {
    callback(false);

  } else {
    const type = checkType(value)
    callback(type === 'dna' || value.replace(/t*/g, '') === '');
  }
};

const baseMap = {
  a: 'adenine',
  c: 'cytosine',
  g: 'guanine',
  t: 'thymine'
}

const baseMapLight = {
  a: 'adenine-light',
  c: 'cytosine-light',
  g: 'guanine-light',
  t: 'thymine-light'
}

let REFERENCE = ''

const setReference = reference => {
  REFERENCE = reference
}

const base = (c, match) => {
  const map = match ? baseMapLight : baseMap
  if (c.toLowerCase() in map) return map[c.toLowerCase()]
  return 'ambiguous'
}
const toSpan = (c, match) => `<span class="${base(c, match)}">${c}</span>`
const toStripe = (c, x, match) => `<line class="${base(c, match)}" y1="0" y2="20" x1="${x}" x2="${x}" style="stroke-width:1"/>`

const toStripes = sequence => {
  const chars = sequence.toString().split('')
  let stripes = ''
  for (var i = 0; i < chars.length; i++) {
    const match = matchesAmbiguously(chars[i], REFERENCE[i])
    stripes += toStripe(chars[i], i, match)
  }
  const div = document.createElement('div');
  div.innerHTML = `<svg height=20 width = ${sequence.length}>${stripes}</svg>`
  return div
}

const toColorText = function(sequence) {
  const chars = sequence.toString().split('')
  let spans = ''
  for (var i = 0; i < chars.length; i++) {
    const match = matchesAmbiguously(chars[i], REFERENCE[i])
    spans += toSpan(chars[i], match)
  }
  const div = document.createElement('div');
  div.innerHTML = spans;
  return div
}

const getValue = (hot, unparsedValue) => {
  if (!unparsedValue.startsWith('='))
    return unparsedValue
  parser.setHot(hot)
  const parsedResult = parser.parse(unparsedValue.substring(1))
  return (parsedResult.error) ? parsedResult.error : parsedResult.result
}

const renderer = function(hot, td, row, col, prop, unparsedValue, cellProperties) {
  const value = getValue(hot, unparsedValue)
  if (typeof value === 'number') {
    Handsontable.renderers.NumericRenderer(hot, td, row, col, prop, value, cellProperties)
    return
  }
  if (typeof value === 'boolean') {
    Handsontable.renderers.TextRenderer(hot, td, row, col, prop, value, cellProperties)
    return
  }
  if (!looksLikeDna(value)) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    return
  }

  const drawStripes = hot.getCellMeta(row, col).drawStripes

  let div
  if (drawStripes) {
    div = toStripes(value)
  } else {
    div = toColorText(value)
    td.style.fontFamily = 'monospace';
    Handsontable.renderers.TextRenderer.apply(this, arguments);
  }
  if (td.childNodes[0] !== undefined)
    td.removeChild(td.childNodes[0]);
  td.appendChild(div)
}

const editor = Handsontable.editors.TextEditor

export default {
  renderer, //: Handsontable.renderers.TextRenderer,
  validator: Handsontable.validators.TextValidator,
  editor,
  setReference,
  getValue
};
