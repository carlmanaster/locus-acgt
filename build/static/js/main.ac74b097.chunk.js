(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){var a=n(2).times,r={a:"a",c:"c",g:"g",t:"t",r:"[ag]",y:"[ct]",s:"[gc]",w:"[at]",k:"[gt]",m:"[ac]",b:"[cgt]",d:"[agt]",h:"[act]",v:"[acg]",n:"[acgt]"},o={a:"a",c:"c",g:"g",t:"t",ag:"r",ct:"y",gc:"s",at:"w",gt:"k",ac:"m",cgt:"b",agt:"d",act:"h",acg:"v",acgt:"n"},c=function(e){var t=e.toLowerCase().split("").reduce(function(e,t){return e+r[t]},"");return new RegExp(t,"g")},i="acgt".split(""),s=function(){return i[Math.floor(4*Math.random())]},l=function(e,t){var n=new Set;e.forEach(function(e){return n.add(e.charAt(t))});var a=Array.from(n);return a.sort(),o[a.join("")]},u=function(e,t){switch(l(e,t)){case"a":case"c":case"g":case"t":return!0;default:return!1}};e.exports={amplicon:function(e,t,n){var a=e.indexOf(t);if(a<0)return"";var r=e.indexOf(n,a);return r<0?"":e.substring(a,r+n.length)},find:function(e,t){var n=c(t);return e.toLowerCase().search(n)},count:function(e,t){var n=c(t);return((e.toLowerCase()||"").match(n)||[]).length},randomSequence:function(e){return a(s,e).join("")},consensus:function(e){for(var t=e[0].length,n=1;n<e.length;n++)t=Math.min(t,e[n].length);for(var a="",r=0;r<t;r++)a+=l(e,r);return a},firstDifference:function(e){for(var t=e[0].length,n=0;n<t;n++)if(!u(e,n))return n;return-1}}},17:function(e,t,n){e.exports=n(36)},22:function(e,t,n){},24:function(e,t,n){},34:function(e,t,n){var a,r=n(2).flatten,o=n(12),c=o.complement,i=o.reverse,s=n(13),l=s.amplicon,u=s.find,d=s.count,f=s.randomSequence,g=s.consensus,p=s.firstDifference,h=new(0,n(35).Parser);h.setHot=function(e){a=e},h.on("callCellValue",function(e,t){var n=e.row.index,r=e.column.index,o=a.getData()[n][r];"="!==o[0]?t(o):t(h.parse(o.substring(1).toUpperCase()).result)}),h.on("callRangeValue",function(e,t,n){for(var r=[],o=e.row.index,c=t.row.index,i=e.column.index,s=t.column.index,l=o;l<=c;l++){for(var u=[],d=i;d<=s;d++){var f=a.getData()[l][d];if("="!==f[0])u.push(f);else{var g=h.parse(f.substring(1).toUpperCase());u.push(g.result)}}r.push(u)}r&&n(r)}),h.on("callFunction",function(e,t,n){switch(e.toUpperCase()){case"REVERSE_COMPLEMENT":n(c(t[0],!0));break;case"REVERSE":n(i(t[0]));break;case"COMPLEMENT":n(c(t[0],!1));break;case"AMPLICON":n(l(t[0],t[1],t[2]));break;case"FIND":n(u(t[0],t[1]));break;case"COUNT":n(d(t[0],t[1]));break;case"RANDOM_SEQUENCE":n(f(t[0]));break;case"BASE":n(t[0].substring(t[1],t[1]+1));break;case"LENGTH":n(t[0].length);break;case"CONSENSUS":n(g(r(t[0])));break;case"FIRST_DIFFERENCE":n(p(r(t[0])))}}),e.exports={parser:h}},36:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(14),c=n.n(o),i=(n(22),n(15)),s=n(3),l=n(4),u=n(6),d=n(5),f=n(7),g=(n(24),n(26),n(16)),p=n(2).forEach,h=function(e){function t(e){var n;Object(s.a)(this,t),n=Object(u.a)(this,Object(d.a)(t).call(this,e));var a=e.data;return n.state={data:a},n}return Object(f.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e={callback:function(e,t,n){console.log(n)},items:{toggle_stripes:{name:"Toggle Stripes",callback:function(){this.setCellMeta(0,0,"drawStripes",!0),this.render()}},set_reference:{name:"Set Reference",callback:function(){!function(e,t,n){p(function(t){for(var a=t.start,r=t.end,o=a.row;o<=r.row;o++)for(var c=a.col;c<=r.col;c++)console.log(o,c),n(e.getCell(o,c))},t)}(this,arguments[1],console.log)}}}},t={data:this.state.data,type:"locus-acgt-dna-sequence",colHeaders:!0,rowHeaders:!0,width:"1200",height:"700",stretchH:"all",formulas:!0,contextMenu:e};return r.a.createElement("div",{id:"hot-app"},r.a.createElement(g.HotTable,{settings:t}))}}]),t}(r.a.Component),m=n(1),v=n.n(m),w=n(12).checkType,E=n(34).parser,b={a:"adenine",c:"cytosine",g:"guanine",t:"thymine"},k={a:"adenine-light",c:"cytosine-light",g:"guanine-light",t:"thymine-light"},C=function(e,t){return t?k[e.toLowerCase()]:b[e.toLowerCase()]},N=function(e,t){return'<span class="'.concat(C(e,t),'">').concat(e,"</span>")},y=v.a.editors.TextEditor,x={renderer:function(e,t,n,a,r,o,c){var i=function(e,t){if(!t.startsWith("="))return t;E.setHot(e);var n=E.parse(t.substring(1));return n.error?n.error:n.result}(e,o);if(Number.isInteger(i))v.a.renderers.NumericRenderer(e,t,n,a,r,i,c);else if("boolean"!==typeof i)if("dna"===w(i)){var s=function(e){for(var t=e.toString().split(""),n="",a=0;a<t.length;a++){var r=t[a]===""[a];n+=N(t[a],r)}var o=document.createElement("div");return o.innerHTML=n,o}(i);t.style.fontFamily="monospace",v.a.renderers.TextRenderer.apply(this,arguments),t.removeChild(t.childNodes[0]),t.appendChild(s)}else v.a.renderers.TextRenderer(e,t,n,a,r,i,c);else v.a.renderers.TextRenderer(e,t,n,a,r,i,c)},validator:v.a.validators.TextValidator,editor:y},O=n(2).times,T=n(13).randomSequence;v.a.cellTypes.registerCellType("locus-acgt-dna-sequence",x),v.a.validators.registerValidator("locus-acgt-dna-sequence",x.validator);var A=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).handleChange=function(e,t){return function(a){n.setState({settings:Object(i.a)({},e,t[a.target.checked?1:0])})}},n.state={data:O(function(){return O(function(){return T(25)},5)},5),settings:{displayText:!1,width:1200,height:220}},n}return Object(f.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("span",{className:"App-title"},"Locus\xa0"),r.a.createElement("span",{className:"App-title adenine"},"A"),r.a.createElement("span",{className:"App-title"},"\u2013"),r.a.createElement("span",{className:"App-title cytosine"},"C"),r.a.createElement("span",{className:"App-title"},"\u2013"),r.a.createElement("span",{className:"App-title guanine"},"G"),r.a.createElement("span",{className:"App-title"},"\u2013"),r.a.createElement("span",{className:"App-title thymine"},"T\xa0"),r.a.createElement("span",{className:"App-subtitle"},"a spreadsheet for sequences")),r.a.createElement(h,{data:this.state.data,name:"hot",id:"hot-id",ref:"hot-ref"}))}}]),t}(a.Component),S=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function j(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}c.a.render(r.a.createElement(A,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/locus-acgt",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/locus-acgt","/service-worker.js");S?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):j(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):j(e)})}}()}},[[17,2,1]]]);
//# sourceMappingURL=main.ac74b097.chunk.js.map