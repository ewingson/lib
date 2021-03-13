import {
  getSolidDataset,
  getThing,
  getStringNoLocale
} from "@inrupt/solid-client";

import {
  login,
  handleIncomingRedirect,
  getDefaultSession,
  fetch
} from "@inrupt/solid-client-authn-browser";

import { VCARD } from "@inrupt/vocab-common-rdf";


const buttonLogin = document.querySelector("#btnLogin");
const buttonRead = document.querySelector("#btnRead");

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
  }
}

// The example has the login redirect back to the index.html.
// This calls the function to process login information.
// If the function is called when not part of the login redirect, the function is a no-op.
handleRedirectAfterLogin();

// 2. Read profile
async function readProfile() {
  const webID = document.getElementById("webID").value;

  // Profile is public data; i.e., you do not _need_ to be logged in to read the data.
  // For illustrative purposes, the (potentially authenticated) `fetch` is passed in anyway.

  const myDataset = await getSolidDataset(webID, { fetch: fetch });

  const profile = getThing(myDataset, webID);

  // Get the formatted name (fn) using the property identifier "http://www.w3.org/2006/vcard/ns#fn".
  // VCARD.fn object is a convenience object that includes the identifier string "http://www.w3.org/2006/vcard/ns#fn".
  // As an alternative, you can pass in the "http://www.w3.org/2006/vcard/ns#fn" string instead of VCARD.fn.
 
  const fn = getStringNoLocale(profile, VCARD.fn);

  // VCARD.role obect is a convenience object that includes the identifier string "http://www.w3.org/2006/vcard/ns#role"
  // As an alternative, you can pass in the "http://www.w3.org/2006/vcard/ns#role" string instead of VCARD.role.

  const role = getStringNoLocale(profile, VCARD.role);

  // Update the page with the retrieved values.
  document.getElementById("labelFN").textContent = fn;
  document.getElementById("labelRole").textContent = role;
}

buttonLogin.onclick = function() {  
  loginToInruptDotNet();
};

buttonRead.onclick = function() {  
  readProfile();
};
