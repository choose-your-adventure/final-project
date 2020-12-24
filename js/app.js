'use strict';

// GLOBAL VARIABLES --------
var pickedPlace = [];
var maxScenes = 5;
var actualScenes = 0;
var userName = '';
var allDestinations = [];
var remainingPlaces = []; //This array is used to populate the thumnails of remaining choices
var chosenPlaces = [];
var allInstructions = [];

// DOM IDS --------
var mainContainer = document.getElementById('maincontainer'); // where the action happens
var selectionContainer = document.getElementById('selectioncontainer'); // for 10 destination thumbnails
var headerContainer = document.getElementById('headercontainer'); // for active image name
var instructionsContainer = document.getElementById('instructionscontainer');
var imageContainer = document.getElementById('imagecontainer'); // for initial image and active destination image
var descriptionContainer = document.getElementById('description'); // for text instructions 
var eventContainer = document.getElementById('eventcontainer'); // for both forms 

// CONSTRUCTORS --------
function Adventure(name, image, text, teaser) {
  this.name = name;
  this.image = `img/${image}`;
  this.thumbnail = `thumbs/${image}`;
  this.text = text;
  // this.blurb = blurb;
  this.teaser = teaser;
  allDestinations.push(this);
}

function Instructions(name, image, text) {
  this.name = name;
  this.image = `img/${image}`;
  this.text = text;
  allInstructions.push(this);
}

// INSTANCES -------
new Adventure('Space Needle', 'space-needle.png', 'Long Descriptive Text about it', 'Click this awesome choice!');
new Adventure('Seattle Sunset', 'seattle-sunset.png', 'Long Descriptive Text about SEATTLE', 'Click this awesome choice!');
new Adventure('Great Wheel', 'great-wheel.png', 'Long Descriptive Text about WHEEL', 'Click this awesome choice!');
new Adventure('Pike Place', 'pike-place.png', 'Long Descriptive Text about PIKE', 'Click this awesome choice!');
new Adventure('Waterfront', 'waterfront.png', 'Long Descriptive Text about WATERFRONT', 'Click this awesome choice!');

// for landing page, how to play page, and pre-postcard page

new Instructions('Welcome to our Adventure in Seattle Game!', 'starting-image.png', `If you choose to play, you'll be led on a virtual adventure around the city, to see whichever sights you'd like to see. You'll learn fun facts and trivia about each location along the way. At the end, you'll have a memento from your trip based on where you decided to go! Enjoy your time, hope you love Seattle!`)
new Instructions('Your Custom Postcard Awaits. . .', 'prepostcard.png', 'Click the button to see your memento')

// to neaten up this instantiation we could make the text / blurb/ teasers all variables that get filled by functions. (reference Pheasants demo for this)

// GLOBAL FUNCTIONS ----------
function renderElement(newElement, parentElement, obj, content, index) {
  if (newElement === 'img' && content === 'thumbnail') { // for thumbnails
    var childElement = document.createElement(newElement);
    childElement.src = obj.thumbnail;
    childElement.title = obj.teaser;
    childElement.alt = obj.name;
    childElement.setAttribute('id', index);
    parentElement.appendChild(childElement);
    childElement.addEventListener('click', handleClick);
  } else if (newElement === 'img' && content === 'image') {  // for large images
    parentElement.innerHTML = '';
    var childElement = document.createElement(newElement);
    childElement.src = obj.image;
    childElement.title = obj.teaser;
    childElement.alt = obj.name;
    parentElement.appendChild(childElement);
  } else {
    parentElement.innerHTML = '';
    var childElement = document.createElement(newElement);  // for text 
    childElement.textContent = obj[content];
    parentElement.appendChild(childElement);
  }
}

function renderThumbnails() {
  selectionContainer.innerHTML = '';
  for (var i = 0; i < remainingPlaces.length; i++) {
    renderElement('img', selectionContainer, remainingPlaces[i], 'thumbnail', i);
  }
}

function populateDestinations() { // preserves original list of destinations and creates a working copy for user interaction
  for (var i = 0; i < allDestinations.length; i++) {
    remainingPlaces[i] = allDestinations[i];
  }
}

function nameInput() {
  // userName stores user form entry. After game completion, userName, postcard text and 5 destination choices are stored to localstorage.

  // nameInput() function receives userName form submission, clear away form, and reverals thumbnails 

  userName = document.getElementById("username");
  localStorage.setItem("username", userName.value);
  console.log(userName.value);
}

function beginAdventure() {
  //  run nameInput() to get user name via form.
  //  clear away form
  // then run showNextScene() to play game.
  nameInput();
  populateDestinations();
  // display starting image and give directions
  renderElement('h2', headerContainer, allInstructions[0], 'name');
  renderElement('img', imageContainer, allInstructions[0], 'image');
  renderElement('p', descriptionContainer, allInstructions[0], 'text');
  renderThumbnails();
}

function showNextScene() {
  renderElement('h2', headerContainer, pickedPlace[0], 'name');
  renderElement('img', imageContainer, pickedPlace[0], 'image');
  renderElement('p', descriptionContainer, pickedPlace[0], 'text');
}

function postcardInput() {
  eventContainer.innerHTML = 'Whew! -- you have completed your journey of Seattle. Each step of your journey has been commemorated by a photo on your custom postcard.';
  // generate a user input form for the text they'd like to put on the postcard
  var postcardButton = document.createElement('button');
  eventContainer.appendChild(postcardButton);
  postcardButton.textContent = 'Click Here for Your Custom Postcard';
  postcardButton.addEventListener('click', revealPostcard);
}

function fillContainerWithSelectedImages() { //not sure why this doesn't grab the image thumbnails
  for (var i = 0; i < chosenPlaces.length; i++) {
    renderElement('img', eventContainer, chosenPlaces[i], 'thumbnail', i);
  }
}

function revealPostcard() {
  // User is sent to results page revealing the postcard.
  // revealPostcard() function displays thumbnails from chosenPlaces array, username, and postcardinput form text (during the game). Then generates a link to load postcard.html to see all previous postcards as well, ranked in order of appearance (plus a timestamp/how long it took?).
  // On results page, a DOM p element is created within the postcard with that text. (limit Max characters on form entry to fit on postcard.)
}

// EVENT HANDLERS ----------

function handleClick(event) {   // user has clicked thumbnail to choose next destination.
  actualScenes++;
  var clickedDestination = event.target.alt;
  var popIndex = null;
  for (var i = 0; i < remainingPlaces.length; i++) {
    if (clickedDestination === remainingPlaces[i].name) {
      popIndex = i;
    }
  }
  pickedPlace = remainingPlaces.splice(popIndex, 1);
  chosenPlaces.push(pickedPlace);
  renderElement('img', eventContainer, pickedPlace[0], 'thumbnail');
  if (actualScenes === maxScenes) {    // selection ends after 5 are chosen; users is presented with postcard form 
    postcardInput();
  }
  renderThumbnails();
  showNextScene();
}

beginAdventure();
