const $rdf = global.$rdf = require('rdflib');                                   
const kb = $rdf.graph();                                                        
const client = new (require("solid-node-client").SolidNodeClient)();            
const fetcher = $rdf.fetcher(kb,{fetch:client.fetch.bind(client)});             
const uri = "https://testpro.solidweb.org/profile/card#me";        

async function test(){                                                          
                                                                             
  await fetcher.load(uri); 
                                                       
  first = kb.sym(uri);
  pred = kb.sym("http://xmlns.com/foaf/0.1/knows");
  let results = kb.match(first,pred); 
  for (var s of results) {                                                   
    console.log('friend\'s webid : ',s.object.value);                                     
  } 
} 
test();
