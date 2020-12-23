'use strict';

// GLOBAL VARIABLES --------

var maxScenes = 5;
var actualScenes = 0;
var userName = '';
var allDestinations = [];
var remainingPlaces = []; //This array is used to populate the thumnails of remaining choices
var chosenPlaces = [];

// DOM IDS --------

var mainContainer = document.getElementById('maincontainer'); // where the action happens
var imageContainer = document.getElementById('imagecontainer'); // for initial image and active destination image
var descriptionContainer = document.getElementById('description'); // for text instructions 
var eventContainer = document.getElementById('formcontainer'); // for both forms 
var selectionContainer = document.getElementById('selectioncontainer'); // for 10 destination thumbnails

// CONSTRUCTOR --------

function Adventure(name, image, text, teaser) {
  this.name = name;
  this.image = `img/${image}`;
  this.thumbnail = `thumbs/${image}`;
  this.text = text;
 // this.blurb = blurb;
  this.teaser = teaser;
  allDestinations.push(this);
}

// DESTINATION INSTANCES -------

new Adventure('Space Needle', 'space-needle.png', 'Long Descriptive Text about it', 'Click this awesome choice!');
new Adventure('Seattle Sunset', 'seattle-sunset.png', 'Long Descriptive Text about it', 'Click this awesome choice!');
new Adventure('Great Wheel', 'great-wheel.png', 'Long Descriptive Text about it', 'Click this awesome choice!');
new Adventure('Pike Place', 'pike-place.png', 'Long Descriptive Text about it', 'Click this awesome choice!');
new Adventure('Waterfront', 'waterfront.png', 'Long Descriptive Text about it', 'Click this awesome choice!');


// to neaten up this instantiation we could make the text / blurb/ teasers all variables that get filled by functions. (reference Pheasants demo for this)

// GLOBAL FUNCTIONS ----------

// userName stores user form entry. After game completion, userName, postcard text and 5 destination choices are stored to localstorage.

// Adventure constructor gets fed 10 destinations to instantiate. each Adventure destination instance has these properties: image, text, description, mouseover teaser text, and this.push to allDestinations array.

// allDestinations stores these instances

// remainingPlaces array stores the images that show as available in the thumbnails

// Each destination that is selected gets pushed into chosenPlaces array. These images display as grayed out from other thumbnails. Potentially these images are popped from remainingPlaces

function renderElement(newElement, parentElement, obj, content, index) {
  // this function populates DOM elements so we don't have to write all this out for each one
  if (newElement === 'img' && content === 'thumbnail') {
    var childElement = document.createElement(newElement);
    childElement.src = obj.thumbnail;
    childElement.title = obj.teaser;
    childElement.alt = obj.name;
    childElement.setAttribute('id', index);
    parentElement.appendChild(childElement);
    childElement.addEventListener('click', handleClick);
  } else if (newElement === 'img' && content === 'image') { 
    var childElement = document.createElement(newElement);
    childElement.src = obj.image;
    childElement.title = obj.teaser;
    childElement.alt = obj.name;
    parentElement.appendChild(childElement);
  } else {
    var childElement = document.createElement(newElement);
    childElement.textContent = obj[content];
    parentElement.appendChild(childElement);
  }
}

populateDestinations();
renderElement('img', imageContainer, allDestinations[0], 'thumbnail');
renderElement('img', imageContainer, allDestinations[0], 'image');
renderElement('p', imageContainer, allDestinations[0], 'text');


function renderThumbnails() {
  //delete previously selected.
  selectionContainer.innerHTML = '';
//iterate through array each time a new thing gets selected. 
  // need img source
  // use the title to find the actual object
  // in selectionContainer
  for (var i = 0; i < remainingPlaces.length; i++) {
    renderElement('img', selectionContainer, remainingPlaces[i], 'thumbnail', i);
  }
}

renderThumbnails();

function populateDestinations() {
  for (var i = 0; i < allDestinations.length; i++) {
    remainingPlaces[i] = allDestinations[i];
  }
}




function nameInput() {
  // nameInput() function receives userName form submission, clear away form, and reverals thumbnails 

}

function beginAdventure() {

 // display thumbnails and starting image and give directions
 
}

function showNextScene() {
  // showNextScene() function clears away previous image (if one previously there) and text and render text and image in appropriate sections in DOM. and presents the choices in thumbnails./updates them if selected.

}

function showAdventure() {
  // first, run nameInput() to get user name via form.
  // then, clear away form
  // then run showNextScene() to play game.

}

function postcardInput() {
  // postcardInput() reveals a text input form. Upon submission, runs revealPostcard()

}


function revealPostcard() {
  // User is sent to results page revealing the postcard.
  // The user is taken through a total of 5 scenes. 
  // revealPostcard() function displays thumbnails from chosenPlaces array, username, and postcardinput form text (during the game). Then generates a link to load results.html to see all previous postcards as well, ranked in order of appearance (timestamp?).

  // On results page, a DOM p element is created within the postcard with that text. (Max characters on form entry to fit on postcard.)

}

// EVENT HANDLERS ----------

//Event handler seems to be not connected to the section of images, does not pick up individual image click
function handleClick(event) {
  actualScenes++;
  var clickedDestination = event.target.alt;
  var popIndex = null;
  for (var i = 0; i < remainingPlaces.length; i++) {
    if (clickedDestination === remainingPlaces[i].name) {
      popIndex = i;
    }
  }
  var pickedPlace = remainingPlaces.splice(popIndex, 1);
  chosenPlaces.push(pickedPlace);

  // user has clicked thumbnail to choose next destination.

  if (actualScenes === maxScenes) {
    // selection ends; users is presented with form 
    postcardInput();
  }
  // pop from available array and push to chosen array
  // showNextScene(allDestinations.name); // find object by using one of its properties (object.title)
  renderThumbnails();
}

showAdventure();
// selectionContainer.addEventListener('click', handleClick);