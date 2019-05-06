function execCode() {
console.log("start of code");

const $rdf = require(‘rdflib’);
const store1  = $rdf.graph();
  
const me = store1.sym('https://testpro.solidweb.org/profile/card#me');
const profile = me.doc();
}
