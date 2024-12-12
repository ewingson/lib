import {SolidNodeClient} from 'solid-node-client';
import SolidFileClient from 'solid-file-client';
const auth = new SolidNodeClient();
const fileClient = new SolidFileClient(auth);

// Put your own functions for retrieving credentials here
import {credentials} from '/home/evemat/Pod/.solid-identity.json';
const loginSettings = credentials.solidCommunity;

// Set paths to your files here
const remoteUrl = `https://testpro.solidweb.org/public/ctest/john/test.ttl`;
const localUrl =  `file://${process.cwd()}/test.html`;

async function main(){
  let session = await auth.login( loginSettings );
  if( session.isLoggedIn ){
     console.log(`Logged in as <${session.WebID}>`);
     let content = await fileClient.readFile( remoteUrl );
     let res=await fileClient.createFile( localUrl, content,'text/turtle');
  }
}
main();
