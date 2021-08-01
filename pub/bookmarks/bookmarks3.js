const $rdf = global.$rdf = require('rdflib');                                   
const kb = $rdf.graph();                                               
const client = new (require("solid-node-client").SolidNodeClient)();            
const fetcher = $rdf.fetcher(kb,{fetch:client.fetch.bind(client)});          
const uri = "https://testpro.solidweb.org/public/eighteenlix.ttl";        

async function test(){                                                          
                                                                             
  await fetcher.load(uri);
                                                        
  //let bookmark = kb.sym(uri); 
  let pred = kb.sym( "http://purl.org/dc/terms/title" ); 
  let results = kb.match(null,pred); 
  for (var s of results) {                                                   
    console.log('ref2 : ',s.object.value);                                     
  }
} 
test();
