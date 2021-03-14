import {
   createSolidDataset,
   createThing,
   setThing,
   addUrl,
   addStringNoLocale,
   saveSolidDatasetAt,
   getSolidDataset,
   getThingAll,
   getStringNoLocale
} from "@inrupt/solid-client";

import {
  login,
  handleIncomingRedirect,
  getDefaultSession,
  fetch
} from "@inrupt/solid-client-authn-browser";

import { SCHEMA_INRUPT_EXT, RDF, AS } from "@inrupt/vocab-common-rdf";

const buttonLogin = document.querySelector("#btnLogin");
const buttonCreate = document.querySelector("#btnCreate");
buttonCreate.disabled=true;
const labelCreateStatus = document.querySelector("#labelCreateStatus");

// 1a. Start Login Process. Call login() function.
function loginToInruptDotNet() {
  return login({
    oidcIssuer: "https://solidweb.org",
    redirectUrl: window.location.href,
  });
}

// 1b. Login Redirect. Call handleIncomingRedirect() function.
// When redirected after login, finish the process by retrieving session information.
async function handleRedirectAfterLogin() {

    await handleIncomingRedirect();
    const session = getDefaultSession();
    if (session.info.isLoggedIn) {
      // Update the page with the status.
      document.getElementById("labelStatus").textContent = "Your session is logged in.";
      document.getElementById("labelStatus").setAttribute("role", "alert");
      // Enable Create button
      buttonCreate.disabled=false;
    }
}

// The example has the login redirect back to the index.html.
// This calls the function to process login information.
// If the function is called when not part of the login redirect, the function is a no-op.
handleRedirectAfterLogin();

// 2. Create the Reading List
async function createList() {
  labelCreateStatus.textContent = "";
  const podUrl = document.getElementById("PodURL").value;
 
  // For simplicity and brevity, this tutorial hardcodes the SolidDataset URL.
  // In practice, you should add a link to this resource in your profile that applications can follow.
  const readingListUrl = `${podUrl}/getting-started/readingList/myList`;
 
  let titles = document.getElementById("titles").value.split("\n");

  let myReadingList  = createSolidDataset();
   
  // Add titles to the Dataset
  for (let i = 0; i < titles.length; i++) {
    let title = createThing({name: "title" + i});
    title = addUrl(title, RDF.type, AS.Article);
    title = addStringNoLocale(title, SCHEMA_INRUPT_EXT.name, titles[i]);
    myReadingList = setThing(myReadingList, title);
  }

  try {
    let savedReadingList = await saveSolidDatasetAt(
      readingListUrl,
      myReadingList,
      { fetch: fetch }
    );

    labelCreateStatus.textContent = "Saved";
    // Disable Create button
    buttonCreate.disabled=true;

    // Refetch the Reading List
    savedReadingList = await getSolidDataset(
      readingListUrl,
      { fetch: fetch }
    );

    let items = getThingAll(savedReadingList);

    let listcontent="";
    for (let i = 0; i < items.length; i++) {
       let item = getStringNoLocale(items[i], SCHEMA_INRUPT_EXT.name);
       if (item != null) {
          listcontent += item + "\n";
       }
    }

    document.getElementById("savedtitles").value = listcontent;

  } catch (error) {
    console.log(error);
    labelCreateStatus.textContent = "Error" + error;
    labelCreateStatus.setAttribute("role", "alert");
  }
 
}


buttonLogin.onclick = function() {  
  loginToInruptDotNet();
};

buttonCreate.onclick = function() {  
  createList();
};
