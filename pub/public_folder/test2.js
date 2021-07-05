const $rdf = require('rdflib');                                                 
const {SolidNodeClient} = require("solid-node-client");                         
const client = new SolidNodeClient();                                           
const store = $rdf.graph();                                                     
const fetcher = $rdf.fetcher(store,{fetch:client.fetch.bind(client)});

const LDP = $rdf.Namespace('http://www.w3.org/ns/ldp#');

let folder = $rdf.sym('https://testpro.solidweb.org/public/');  // NOTE: Ends in a slash

fetcher.load(folder).then( () => {                                              
  let files = store.each( folder, LDP('contains'));                             
  for (var file of files) {                                                     
    console.log('contains : ',file.value);
    }
});
