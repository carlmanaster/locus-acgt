(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){var a=n(7).times,r={a:"a",c:"c",g:"g",t:"t",r:"[ag]",y:"[ct]",s:"[cg]",w:"[at]",k:"[gt]",m:"[ac]",b:"[cgt]",d:"[agt]",h:"[act]",v:"[acg]",n:"[acgt]"},o={a:"a",c:"c",g:"g",t:"t",ag:"r",ct:"y",cg:"s",at:"w",gt:"k",ac:"m",cgt:"b",agt:"d",act:"h",acg:"v",acgt:"n"},c=function(e){var t=e.toLowerCase().split("").reduce(function(e,t){return e+r[t]},"");return new RegExp(t,"gi")},i=function(e,t){var n=c(t);return((e||"").match(n)||[]).length},s="acgt".split(""),l=function(){return s[Math.floor(4*Math.random())]},u=function(e,t){var n=new Set;e.forEach(function(e){return n.add(e.charAt(t))});var a=Array.from(n);return a.sort(),o[a.join("")]},f=function(e,t){switch(u(e,t)){case"a":case"c":case"g":case"t":return!0;default:return!1}};e.exports={amplicon:function(e,t,n){var a=e.indexOf(t);if(a<0)return"";var r=e.indexOf(n,a);return r<0?"":e.substring(a,r+n.length)},find:function(e,t){var n=c(t);return e.search(n)},count:i,randomSequence:function(e){return a(l,e).join("")},consensus:function(e){for(var t=e[0].length,n=1;n<e.length;n++)t=Math.min(t,e[n].length);for(var a="",r=0;r<t;r++)a+=u(e,r);return a},firstDifference:function(e){for(var t=e[0].length,n=0;n<t;n++)if(!f(e,n))return n;return-1},looksLikeDna:function(e){return"number"!==typeof e&&""===e.replace(/[acgtryswkmbdhvn]/gi,"")},meltingTemperature:function(e){return e.length<=13?2*i(e,"w")+4*i(e,"s"):64.9+41*(i(e,"s")-16.4)/e.length},gcContent:function(e){return 100*i(e,"s")/e.length}}},19:function(e,t,n){e.exports=n(38)},24:function(e,t,n){},26:function(e,t,n){},36:function(e,t,n){var a,r=n(7).flatten,o=n(13),c=o.complement,i=o.reverse,s=n(14),l=s.amplicon,u=s.find,f=s.count,g=s.randomSequence,d=s.consensus,h=s.firstDifference,p=s.meltingTemperature,E=s.gcContent,m=new(0,n(37).Parser);m.setHot=function(e){a=e},m.on("callCellValue",function(e,t){var n=e.row.index,r=e.column.index,o=a.getData()[n][r];"="!==o[0]?t(o):t(m.parse(o.substring(1).toUpperCase()).result)}),m.on("callRangeValue",function(e,t,n){for(var r=[],o=e.row.index,c=t.row.index,i=e.column.index,s=t.column.index,l=o;l<=c;l++){for(var u=[],f=i;f<=s;f++){var g=a.getData()[l][f];if("="!==g[0])u.push(g);else{var d=m.parse(g.substring(1).toUpperCase());u.push(d.result)}}r.push(u)}r&&n(r)}),m.on("callFunction",function(e,t,n){switch(e.toUpperCase()){case"REVERSE_COMPLEMENT":n(c(t[0],!0));break;case"REVERSE":n(i(t[0]));break;case"COMPLEMENT":n(c(t[0],!1));break;case"AMPLICON":n(l(t[0],t[1],t[2]));break;case"FIND":n(u(t[0],t[1]));break;case"COUNT":n(f(t[0],t[1]));break;case"RANDOM_SEQUENCE":n(g(t[0]));break;case"BASE":n(t[0].substring(t[1],t[1]+1));break;case"LENGTH":n(t[0].length);break;case"CONSENSUS":n(d(r(t[0])));break;case"FIRST_DIFFERENCE":n(h(r(t[0])));break;case"MELTING_TEMPERATURE":n(Math.round(10*p(t[0]))/10);break;case"GC_CONTENT":n(Math.round(E(t[0])))}}),e.exports={parser:m}},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(15),c=n.n(o),i=(n(24),n(16)),s=n(2),l=n(3),u=n(5),f=n(4),g=n(6),d=n(18),h=(n(26),n(28),n(8)),p=n(17),E=n(7).forEach,m=function(e){function t(e){var n;Object(s.a)(this,t),n=Object(u.a)(this,Object(f.a)(t).call(this,e));var a=e.data;return n.state={data:a},n}return Object(g.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e={callback:function(e,t,n){console.log(n)},items:{toggle_stripes:{name:"Toggle Stripes",callback:function(){this.setCellMeta(0,0,"drawStripes",!0),this.render()}},set_reference:{name:"Set Reference",callback:function(){!function(e,t,n){E(function(t){for(var a=t.start,r=t.end,o=a.row;o<=r.row;o++)for(var c=a.col;c<=r.col;c++)console.log(o,c),n(e.getCell(o,c))},t)}(this,arguments[1],console.log)}}}},t={data:this.state.data,type:"locus-acgt-dna-sequence",colHeaders:!0,rowHeaders:!0,width:"1200",height:"700",stretchH:"all",formulas:!0,manualColumnResize:!0,contextMenu:e};return r.a.createElement("div",{id:"hot-app"},r.a.createElement(p.HotTable,{settings:t}))}}]),t}(r.a.Component),v=n(1),A=n.n(v),C=(n(13).checkType,n(36).parser),b=n(14).looksLikeDna,w={a:"adenine",c:"cytosine",g:"guanine",t:"thymine"},N={a:"adenine-light",c:"cytosine-light",g:"guanine-light",t:"thymine-light"},T=function(e,t){var n=t?N:w;return e.toLowerCase()in n?n[e.toLowerCase()]:"ambiguous"},R=function(e,t){return'<span class="'.concat(T(e,t),'">').concat(e,"</span>")},k=A.a.editors.TextEditor,O={renderer:function(e,t,n,a,r,o,c){var i=function(e,t){if(!t.startsWith("="))return t;C.setHot(e);var n=C.parse(t.substring(1));return n.error?n.error:n.result}(e,o);if("number"!==typeof i)if("boolean"!==typeof i)if(b(i)){var s=function(e){for(var t=e.toString().split(""),n="",a=0;a<t.length;a++){var r=t[a]===""[a];n+=R(t[a],r)}var o=document.createElement("div");return o.innerHTML=n,o}(i);t.style.fontFamily="monospace",A.a.renderers.TextRenderer.apply(this,arguments),t.removeChild(t.childNodes[0]),t.appendChild(s)}else A.a.renderers.TextRenderer(e,t,n,a,r,i,c);else A.a.renderers.TextRenderer(e,t,n,a,r,i,c);else A.a.renderers.NumericRenderer(e,t,n,a,r,i,c)},validator:A.a.validators.TextValidator,editor:k},S={};A.a.cellTypes.registerCellType("locus-acgt-dna-sequence",O),A.a.validators.registerValidator("locus-acgt-dna-sequence",O.validator),A.a.hooks.add("modifyAutofillRange",function(e,t){S={startArea:t,entireArea:e}}),A.a.hooks.add("beforeChange",function(e,t){if("Autofill.fill"===t){var n=S,a=n.startArea,r=n.entireArea;e.forEach(function(e){var t=Object(d.a)(e,4),n=t[0],o=t[1],c=(t[2],t[3]),i=Object(h.sourceCellForFill)(n,o,a,r),s=Object(h.translateCell)(i,{row:n,col:o},c);e[3]=s})}});var M=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(f.a)(t).call(this,e))).handleChange=function(e,t){return function(a){n.setState({settings:Object(i.a)({},e,t[a.target.checked?1:0])})}},n.state={data:[["tccagggacattcatgcatcgcctt","","","","","","","","",""],["tccaggtacattcatgcattgcctt","","","","","","","","",""],["cat","","","","","","","","",""],["gcc","","","","","","","","",""],["=AMPLICON(A1, A3, A4)","AMPLICON(A1, A3, A4)","","","","","","","",""],["=BASE(A1, 1)","BASE(A1, 1)","","","","","","","",""],["=COMPLEMENT(A1)","COMPLEMENT(A1)","","","","","","","",""],["=CONSENSUS(A1:A2)","CONSENSUS(A1:A2)","","","","","","","",""],["=COUNT(A1, A3)","COUNT(A1, A3)","","","","","","","",""],["=FIND(A1, A3)","FIND(A1, A3)","","","","","","","",""],["=FIRST_DIFFERENCE(A1:A2)","FIRST_DIFFERENCE(A1:A2)","","","","","","","",""],["=GC_CONTENT(A1)","GC_CONTENT(A1)","","","","","","","",""],["=LENGTH(A1)","LENGTH(A1)","","","","","","","",""],["=MELTING_TEMPERATURE(A1)","MELTING_TEMPERATURE(A1)","","","","","","","",""],["=RANDOM_SEQUENCE(30)","RANDOM_SEQUENCE(30)","","","","","","","",""],["=REVERSE_COMPLEMENT(A1)","REVERSE_COMPLEMENT(A1)","","","","","","","",""],["=REVERSE(A1)","REVERSE(A1)","","","","","","","",""]],settings:{displayText:!1,width:1200,height:220}},n}return Object(g.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("span",{className:"App-title"},"Locus\xa0"),r.a.createElement("span",{className:"App-title adenine"},"A"),r.a.createElement("span",{className:"App-title"},"\u2013"),r.a.createElement("span",{className:"App-title cytosine"},"C"),r.a.createElement("span",{className:"App-title"},"\u2013"),r.a.createElement("span",{className:"App-title guanine"},"G"),r.a.createElement("span",{className:"App-title"},"\u2013"),r.a.createElement("span",{className:"App-title thymine"},"T\xa0"),r.a.createElement("span",{className:"App-subtitle"},"a spreadsheet for sequences"),r.a.createElement("span",{className:"App-subtitle",style:{float:"right"}},r.a.createElement("a",{href:"https://github.com/carlmanaster/locus-acgt",target:"_blank"},r.a.createElement("img",{src:"GitHub-Mark-Light-32px.png",alt:"octocat"})))),r.a.createElement(m,{data:this.state.data,name:"hot",id:"hot-id",ref:"hot-ref"}))}}]),t}(a.Component),y=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function L(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}c.a.render(r.a.createElement(M,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/locus-acgt",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/locus-acgt","/service-worker.js");y?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):L(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):L(e)})}}()},8:function(e,t){var n="a".charCodeAt(),a=function(e){return e.startsWith("=")},r=function(e){return e.substring(1)},o=function(e){var t=e.match(/\$?[a-z]{1,2}\$?\d+/gi);return t||[]},c=function(e){return e-1},i=function(e){return e+1},s=function(e){var t=e.toLowerCase();return 1===t.length?t.charCodeAt(0)-n:26*(t.charCodeAt(0)-n+1)+t.charCodeAt(1)-n},l=function(e){var t=String.fromCharCode(e%26+n);return e>25&&(t+=String.fromCharCode(Math.floor(e/26)+n-1)),t},u=function(e,t,n){var a=i(e.row);t&&(a="$".concat(a));var r=l(e.col);return n&&(r="$".concat(r)),"".concat(r).concat(a)},f=function(e){var t=e.replace(/\$/g,""),n=t.search(/\d/);return{row:c(t.substring(n)),col:s(t.substring(0,n))}},g=function(e,t,n){var a=n.startsWith("$"),r=n.substring(1).search("\\$")>-1,o=t.row-e.row,c=t.col-e.col,i=f(n);return r||(i.row+=o),a||(i.col+=c),u(i,r,a)},d=function(e,t,n){var a=1+t[1]-t[0];return t[0]===n[0]?t[0]+(e-n[0])%a:t[1]-(n[1]-e)%a};e.exports={isFormula:a,getFormula:r,translateCell:function(e,t,n){if(!a(n))return n;var c=r(n);return o(c).forEach(function(n){var a=g(e,t,n);c=c.replace(n,a)}),"=".concat(c)},getReferences:o,toRowIndex:c,toColumnIndex:s,toReference:u,toRow:i,toColumn:l,toCoordinates:f,translateReference:g,sourceCellForFill:function(e,t,n,a){var r=n[2]-n[0]+1;if("vertical"===(a[2]-a[0]+1>r?"vertical":"horizontal")){var o=t;return{row:d(e,[n[0],n[2]],[a[0],a[2]]),col:o}}return{row:e,col:d(t,[n[1],n[3]],[a[1],a[3]])}},sourceIndex:d}}},[[19,2,1]]]);
//# sourceMappingURL=main.6ab6402d.chunk.js.map