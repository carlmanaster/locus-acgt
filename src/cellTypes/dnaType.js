import Handsontable from 'handsontable'

const {checkType} = require('bionode-seq')

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

const thing = c => {
  switch (c.toLowerCase()) {
    case 'a': return `<span class="adenine">${c}</span>`
    case 'c': return `<span class="cytosine">${c}</span>`
    case 'g': return `<span class="guanine">${c}</span>`
    case 't': return `<span class="thymine">${c}</span>`
    default: return c
  }
}



const renderer = function(instance, td, row, col, prop, value, cellProperties) {
  const chars = value.toString().split('')
  const spans = chars.map(thing).join('')

  var z = document.createElement('div'); // is a node
  z.innerHTML = spans;
  console.log(`z:`, z)

  // console.log(`spans:`, spans)
  // td = `<td style="font-family: monospace;">${spans}</td>`
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  // console.log(`td.style:`, td.style)
  td.style.fontFamily = 'monospace';
  td.removeChild(td.childNodes[0]);
  td.appendChild(z)


  //
  // value = `<span>${value}</span>`
  // Handsontable.renderers.TextRenderer.apply(this, arguments);
  // console.log(`value:`, value)
  // console.log(`td:`, td)
};
// <td style="font-family: monospace;">ttaccatctc</td>



export default {
  renderer,
  validator,
};
