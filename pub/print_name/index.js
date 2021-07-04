const $rdf = require('rdflib');                                                 
const {SolidNodeClient} = require("solid-node-client");                         
const client = new SolidNodeClient();                                           
const store = $rdf.graph();                                                     
const fetcher = $rdf.fetcher(store,{fetch:client.fetch.bind(client)});          
const me = store.sym('https://testpro.solidweb.org/profile/card#me'); 
const profile = me.doc()                                                        
const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');           
const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');                      
                                                                                
fetcher.load(profile).then( ()=>{                                                    
  let name = store.any(me, VCARD("fn")) || store.any(me, FOAF("name"));         
  console.log("user name: ", name.value);                                       
});
