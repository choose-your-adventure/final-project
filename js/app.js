'use strict';

var pickedPlace = [];
var maxScenes = 5;
var actualScenes = 0;
var userName = '';
var allDestinations = [];
var remainingPlaces = []; //This array is used to populate the thumnails of remaining choices
var chosenPlaces = [];
var allInstructions = [];

var mainContainer = document.getElementById('maincontainer'); // where the action happens
var selectionContainer = document.getElementById('selectioncontainer'); // for 10 destination thumbnails
var headerContainer = document.getElementById('headercontainer'); // for active image name
var instructionsContainer = document.getElementById('instructionscontainer');
var imageContainer = document.getElementById('imagecontainer'); // for initial image and active destination image
var descriptionContainer = document.getElementById('description'); // for text instructions 
var eventContainer = document.getElementById('eventcontainer'); // for both forms 
var finalForm = document.getElementById('finalform'); //for postcard text entry

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

new Adventure('Space Needle', 'space-needle.png', 'Long Descriptive Text about it', 'Click this awesome choice!');
new Adventure('Seattle Sunset', 'seattle-sunset.png', 'Long Descriptive Text about SEATTLE', 'Click this awesome choice!');
new Adventure('Great Wheel', 'great-wheel.png', 'Long Descriptive Text about WHEEL', 'Click this awesome choice!');
new Adventure('Pike Place', 'pike-place.png', 'Long Descriptive Text about PIKE', 'Click this awesome choice!');
new Adventure('Waterfront', 'waterfront.png', 'Long Descriptive Text about WATERFRONT', 'Click this awesome choice!');

new Instructions('Welcome to our Adventure in Seattle Game!', 'starting-image.png', `If you choose to play, you'll be led on a virtual adventure around the city, to see whichever sights you'd like to see. You'll learn fun facts and trivia about each location along the way. At the end, you'll have a memento from your trip based on where you decided to go! Enjoy your time, hope you love Seattle!`)
new Instructions('Game play instructions', 'space-needle.png', 'you are having fun right now because you are playing this game')
new Instructions('Your Custom Postcard Awaits. . .', 'prepostcard.png', 'Click the button to see your memento')

function renderElement(newElement, parentElement, obj, content, index) {
  if (newElement === 'img' && content === 'thumbnail') { // for thumbnails
    var childElement = document.createElement(newElement);
    childElement.src = obj.thumbnail;
    childElement.title = obj.teaser;
    childElement.alt = obj.name;
    childElement.setAttribute('id', index);
    parentElement.appendChild(childElement);
    childElement.addEventListener('click', thumbClick);
  } else if (newElement === 'img' && content === 'image') {  // for large images
    parentElement.innerHTML = '';
    var childElement = document.createElement(newElement);
    childElement.src = obj.image;
    childElement.title = obj.teaser;
    childElement.alt = obj.name;
    parentElement.appendChild(childElement);
    childElement.addEventListener('click', flipBigImage);
  } else {
    parentElement.innerHTML = '';
    var childElement = document.createElement(newElement);  // for text 
    childElement.textContent = obj[content];
    parentElement.appendChild(childElement);
  }
}

function beginAdventure() {
  finalForm.setAttribute("style", "display:none;") // hide final button
  // display starting image and give directions
  renderElement('h2', headerContainer, allInstructions[0], 'name');
  renderElement('img', imageContainer, allInstructions[0], 'image');
  renderElement('p', descriptionContainer, allInstructions[0], 'text');
  eventContainer.addEventListener('submit', inputName);
}

function inputName(event) {
  event.preventDefault();
  userName = event.target.username.value;
  localStorage.setItem('username', userName);
  eventContainer.innerHTML = '';
  enterGame();
}

function enterGame() {
  for (var i = 0; i < allDestinations.length; i++) {
    remainingPlaces[i] = allDestinations[i];
  } // preserves original list of destinations and creates a working copy for user interaction
  renderElement('h2', headerContainer, allInstructions[1], 'name');
  renderElement('img', imageContainer, allInstructions[1], 'image');
  renderElement('p', descriptionContainer, allInstructions[1], 'text');
  renderThumbnails();
}

function renderThumbnails() {
  selectionContainer.innerHTML = '';
  for (var i = 0; i < remainingPlaces.length; i++) {
    renderElement('img', selectionContainer, remainingPlaces[i], 'thumbnail', i);
  }
}

function thumbClick(event) {   // user has clicked thumbnail to choose next destination.
  actualScenes++;
    if (actualScenes < maxScenes) {    // selection ends after 5 are chosen; users is presented with postcard form 
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
    renderThumbnails();
    showNextScene();    
  } else {
    postcardInput();
  }
}

function showNextScene() {
  renderElement('h2', headerContainer, pickedPlace[0], 'name');
  renderElement('img', imageContainer, pickedPlace[0], 'image');
  renderElement('p', descriptionContainer, pickedPlace[0], 'text');
}

function flipBigImage(event) {
  // flip image to show trivia about location
  // imageContainer.setAttribute("style", ""); // reveal its .blurb attribute
  //remove that handler
  // then add event handler to big image to flip back over. (and then remove that handler and replace it with the flipBigImage one)
}

function postcardInput() {
  selectionContainer.innerHTML = '';
  eventContainer.innerHTML = `Whew! -- you have completed your journey of Seattle. Each step of your journey has been commemorated by a photo on your custom postcard. Now it's time to write your custom message. What would you like your postcard to say?`;
  renderElement('h2', headerContainer, allInstructions[2], 'name');
  renderElement('img', imageContainer, allInstructions[2], 'image');
  renderElement('p', descriptionContainer, allInstructions[2], 'text');
  finalForm.setAttribute("style", "display:initial;") // make this button also a link to load new page.

  // var postcardButton = document.createElement('a');
  // postcardButton.setAttribute("style", "text-decoration: none; color: black; padding: 5px; margin: 10px; background-color:#ccc; border: 1px solid black;")
  // var nextPage = document.createTextNode('View Postcard')
  // postcardButton.appendChild(nextPage);
  // postcardButton.title = 'Click Here for Your Custom Postcard';
  // postcardButton.href = 'postcard.html';
  // eventContainer.appendChild(postcardButton);

  fillContainerWithSelectedImages();
}

function fillContainerWithSelectedImages() { //not sure why this doesn't grab the image thumbnails. the idea is to have the complete list populate and store them to localStorage. 
  for (var i = 0; i < chosenPlaces.length; i++) {
    var childElement = document.createElement('img');
    childElement.src = chosenPlaces[i][0].thumbnail;
    childElement.title = chosenPlaces[i][0].teaser;
    childElement.alt = chosenPlaces[i][0].name;
    childElement.setAttribute('id', i);
    eventContainer.appendChild(childElement);
  //save chosenPlaces array to localstorage
  }
}

function revealPostcard() {
  // User is sent to results page revealing the postcard.
  // revealPostcard() function displays thumbnails from chosenPlaces array, username, and postcardinput form text (during the game). Then generates a link to load postcard.html to see all previous postcards as well, ranked in order of appearance (plus a timestamp/how long it took?).
  // On results page, a DOM p element is created within the postcard with that text. (limit Max characters on form entry to fit on postcard.)

}

beginAdventure();
