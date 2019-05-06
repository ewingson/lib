function execCode() {
console.log("start of code");

const $rdf = require('rdflib');
const store1  = $rdf.graph();
  
const me = store1.sym('https://testpro.solidweb.org/profile/card#me');
const profile = me.doc();
  
const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
store1.add(me, VCARD('fn'), "Matthias configedit Evering", profile);
  
let name = store1.any(me, VCARD('name'), null, profile);
let role = store1.any(me, VCARD('role'), null, profile);
let org = store1.any(me, VCARD('org'), null, profile);
console.log(name);
console.log(role);
console.log(org);
}
