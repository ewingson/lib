//function called on entry-point
function execCode() {
//start-message
console.log("start of code");

//dependency (continuing locally)
const $rdf = require('rdflib');
//initialize graph
const store1  = $rdf.graph();

//setup store
const me = store1.sym('https://testpro.solidweb.org/profile/card#me');
//generate named node
const profile = me.doc();

//setup namespace
const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
//add data to store
store1.add(me, VCARD('fn'), "John C. Doe", profile);

//get data
let name = store1.any(me, VCARD('name'), null, profile);
let role = store1.any(me, VCARD('role'), null, profile);
let org = store1.any(me, VCARD('org'), null, profile);
//output data
console.log(name);
console.log(role);
console.log(org);
//further things
//after gathering info I think I will proceed locally
}
