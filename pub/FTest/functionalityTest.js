// already published on https://github.com/ewingson/lib/blob/master/pub/FTest/functionalityTest.js although wrecky and in development... NOT git-pushed...
/** desired filename and location workspaces/solid-ui/src/widgets/functionalityTest.js
 *
 * FTest pane
 * 
 * This pane offers some mechanisms for testing variables and functions. Beside it is a timezone-experiment.
 * It is located in the widgets-source, case we find git and npm run watch have no objections.
 *
 * Assumptions
 *
 * 1. assumes that the user has a type index entry for vcard:AddressBook (assumption copied over).
 * 2. we get all imports to work.
 * 3. our coding abilities are sufficient.
 *
 * Goals
 *
 * 1. to explore the codebase of the server at a low level.
 * 2. a test of a test.
 * 3. examination, evaluation, exploration, experiment.
 *
 */
// functions / classes ?  
//import escape from 'escape-html'
import uuid from 'uuid'
import * as rdf from 'rdflib'
import * as debug from '../debug'

// comment of @Sharon, gratitude
// const webClient = require('solid-web-client')(rdf)

// ./ == widgets ? ../ == your local ?
//import { makeDropTarget } from './dragAndDrop'
import { errorMessageBlock } from './error'
//import { iconBase } from '../iconBase'
import ns from '../ns'
import { solidLogicSingleton } from '../logic'

const lmn = solidLogicSingleton.store

export class functionalityTest {
  //five hardcoded persons
  constructor (element, typeIndex, options, testvar) {
  this.element = element
  this.typeIndex = typeIndex
  this.options = options || {}
  this.testvar = '' || 'this_is_a_teststring' || {}
  // klarnamen, real names
  this.tdisplay = ['jeff', 'angelo', 'michiel', 'sharon', 'matthias']
  this.timezone = ['pacific', 'CET', 'CET', 'melbourne', 'CET']
  // difference from GMT
  this.offspin = [-9, 1, 1, 10, 1]
  }
  
  render() {
  const container = document.createElement('div')
    container.style.maxWidth = '350px'
    container.style.minHeight = '200px'
    container.style.outline = '1px solid black'
    container.style.display = 'flex'
    
    // here goes the html to js or vice versa stuff
    
    this.element.innerHTML = ''
    this.element.appendChild(container)
    return this
  }

}

export class getTimezoneByWebid {

  debug.log ('this is a debug message from the tz-class')
  console.log ('we have defined the store lmn in the head')

// here goes the logic of finding the Webids of the hardcoded persons.
// TODO:
// a possible goal could be to display the timezone of the POD-Provider.
// if it was magic we would check if the person is logged in, then find the location the ISP-Connection tells us and generate the timezone and display it on the profile ;-) --ipinfo.io--
//
// Questions
// - where is {([../logic])} I guess on Sharons dev-directory
// - is it okay to put my stuff in the desired location (line 1)
// - store / turtle / subject / predicate / object / quad
//
// Comments
// - if we have a quad, the forth parameter is the document itself
//
// Conclusion
// - will work in the dev-test Branch of ewingson/solid-ui (at least for the moment)
// - TODO: how to create a pane ---- look for solid-logic ---- import and define const lmn store from logic.ts ---- store the data in public type index on testpro ---- make up good questions
}


