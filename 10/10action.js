//function called on entry-point
function execCode() {
//start-message
console.log("start of code");
//dependency
const auth = require('solid-auth-client')
//track
auth.trackSession(session => {
  if (!session)
    console.log('The user is not logged in')
  else
    console.log(`logged in as ${session.webId}`)
})
}
