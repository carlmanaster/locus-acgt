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
    callback(type === 'dna');
  }
};

const base = c => {
  switch (c.toLowerCase()) {
    case 'a': return `adenine`
    case 'c': return `cytosine`
    case 'g': return `guanine`
    case 't': return `thymine`
    default: return ``
  }
}

const toSpan = c => `<span class="${base(c)}">${c}</span>`
const toStripe = (c, x) => `<line class="${base(c)}" y1="3" y2="20" x1="${x}" x2="${x}" style="stroke-width:1"/>`

const toStripes = sequence => {
  const chars = sequence.toString().split('')
  let stripes = ''
  for (var i = 0; i < chars.length; i++) {
    stripes += toStripe(chars[i], i)
  }
  const div = document.createElement('div');
  div.innerHTML = `<svg height="20" width="100">${stripes}</svg>`
  return div
}

const toColorText = sequence => {
  const chars = sequence.toString().split('')
  const spans = chars.map(toSpan).join('')
  const div = document.createElement('div');
  div.innerHTML = spans;
  return div
}

const renderer = function(instance, td, row, col, prop, value, cellProperties) {
  const div = toStripes(value)
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.fontFamily = 'monospace';
  td.removeChild(td.childNodes[0]);
  td.appendChild(div)
};

const editor = Handsontable.editors.TextEditor

export default {
  renderer,
  validator,
  editor
};
