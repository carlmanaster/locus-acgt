import Handsontable from 'handsontable'

const { checkType } = require('bionode-seq')

const validator = (value, callback) => {
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

const REFERENCE = 'acactatacgtaggactgaggcatgacgcgatcgacgcgatacgagcatcgatcgactacgcggcatcacgaagc'

const base = (c, match) => match? baseMapLight[c.toLowerCase()] :baseMap[c.toLowerCase()]
const toSpan = (c, match) => `<span class="${base(c, match)}">${c}</span>`
const toStripe = (c, x, match) => `<line class="${base(c, match)}" y1="0" y2="20" x1="${x}" x2="${x}" style="stroke-width:1"/>`

const toStripes = sequence => {
  const chars = sequence.toString().split('')
  let stripes = ''
  for (var i = 0; i < chars.length; i++) {
    const match = chars[i] === REFERENCE[i]
    stripes += toStripe(chars[i], i, match)
  }
  const div = document.createElement('div');
  div.innerHTML = `<svg height=20 width = ${sequence.length}>${stripes}</svg>`
  return div
}

const toColorText = sequence => {
  const chars = sequence.toString().split('')
  let spans = ''
  for (var i = 0; i < chars.length; i++) {
    const match = chars[i] === REFERENCE[i]
    spans += toSpan(chars[i], match)
  }
  const div = document.createElement('div');
  div.innerHTML = spans;
  return div
}

const renderer = function(hot, td, row, col, prop, value, cellProperties) {
  console.log(`hot.getCellMeta(row, col):`, hot.getCellMeta(row, col))

  // console.log(`cellProperties:`, cellProperties)
  // const div = toColorText(value)
  // td.style.fontFamily = 'monospace';
  const div = toStripes(value)
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.removeChild(td.childNodes[0]);
  td.appendChild(div)
};

const editor = Handsontable.editors.TextEditor

export default {
  renderer,
  validator,
  editor
};
