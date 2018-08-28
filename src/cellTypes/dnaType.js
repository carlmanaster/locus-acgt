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

const toSpan = c => {
  switch (c.toLowerCase()) {
    case 'a': return `<span class="adenine">${c}</span>`
    case 'c': return `<span class="cytosine">${c}</span>`
    case 'g': return `<span class="guanine">${c}</span>`
    case 't': return `<span class="thymine">${c}</span>`
    default: return c
  }
}

const toStripe = (c, x) => {
  switch (c.toLowerCase()) {
    case 'a': return `<line class="adenine" y1="3" y2="20" x1="${x}" x2="${x}" style="stroke-width:1"/>`
    case 'c': return `<line class="cytosine" y1="3" y2="20" x1="${x}" x2="${x}" style="stroke-width:1"/>`
    case 'g': return `<line class="guanine" y1="3" y2="20" x1="${x}" x2="${x}" style="stroke-width:1"/>`
    case 't': return `<line class="thymine" y1="3" y2="20" x1="${x}" x2="${x}" style="stroke-width:1"/>`
    default: return c
  }
}

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
