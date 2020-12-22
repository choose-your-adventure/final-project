'use strict';

// GLOBAL VARIABLES --------

maxScenes = 5;
actualScenes = 0;
userName = '';
allDestinations = [];
remainingPlaces = [];
chosenPlaces = [];

// DOM IDS --------


// CONSTRUCTOR ------

function Adventure(name, image, thumbnail, text, blurb, teaser) {
  this.name = name;
  this.image = image;
  this.thumbnail = thumbnail;
  this.text = text;
  this.blurb = blurb;
  this.teaser = teaser;
  allDestinations.push(this);
}




// GLOBAL FUNCTIONS ----------


// userName stores user form entry. After game completion, userName, postcard text and 5 destination choices are stored to localstorage.

// Adventure constructor gets fed 10 destinations to instantiate. each Adventure destination instance has these properties: image, text, description, mouseover teaser text, and this.push to allDestinations array.

// allDestinations stores these instances

// remainingPlaces array stores the images that show as available in the thumbnails

// Each destination that is selected gets pushed into chosenPlaces array. These images display as grayed out from other thumbnails. Potentially these images are popped from remainingPlaces



function nameInput() {
// nameInput() function receives userName form submission, clear away form, and showNextScene() 

}

function showNextScene() {
// showNextScene() function clears away previous image and text and render text and image in appropriate sections in DOM. and presents the choices in thumbnails./updates them if selected.



}

function showAdventure() {

}




function postcardInput() {
// postcardInput() reveals a text input form. Upon submission, runs revealPostcard()

}

function revealPostcard() {
// revealPostcard() function displays thumbnails from chosenPlaces array, username, and postcardinput form text (during the game). Then generates a link to load results.html to see all previous postcards as well, ranked in order of appearance (timestamp?).

// On results page, a DOM p element is created within the postcard with that text. (Max characters on form entry to fit on postcard.)

}


// EVENT HANDLERS ----------

// Event listener: user clicks thumbnail to choose next destination.
// actualScenes++

// The user is taken through a total of 5 scenes. When 5 is reached, game ends. User is sent to results page revealing the postcard.

function handleClick(event) {

}

showAdventure();
mainContainer.addEventListener('click', handleClick);