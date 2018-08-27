import Handsontable from 'handsontable'

const { checkType } = require('bionode-seq')

// for some reason this does not seem to be called
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
    console.log(`type:`, type)
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

const toDiv = sequence => {
  const chars = sequence.toString().split('')
  const spans = chars.map(toSpan).join('')
  const div = document.createElement('div');
  div.innerHTML = spans;
  return div
}

const renderer = function(instance, td, row, col, prop, value, cellProperties) {
  const div = toDiv(value)
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
