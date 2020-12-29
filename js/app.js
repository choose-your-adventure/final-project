'use strict';

var pickedPlace = [];
var maxScenes = 5;
var actualScenes = 0;
var userName = '';
var allDestinations = [];
var remainingPlaces = []; //This array is used to populate the thumnails of remaining choices
var chosenPlaces = [];
var allInstructions = [];
var postcardMessage = '';
var storedUserName = localStorage.getItem('username');

var date = new Date();
var postmark = date.toLocaleDateString(); // get local date/time for message postmark
localStorage.setItem('postmark', postmark);

var allEncounters = [];
var remainingEncounters = [];
var doneEncounters = [];
var currentEncounterIndex = 0;
var encounterBadges = [];

var mainContainer = document.getElementById('maincontainer'); // where the action happens
var selectionContainer = document.getElementById('selectioncontainer'); // for 10 destination thumbnails
var headerContainer = document.getElementById('headercontainer'); // for active image name
var instructionsContainer = document.getElementById('instructionscontainer');
var imageContainer = document.getElementById('imagecontainer'); // for initial image and active destination image
var descriptionContainer = document.getElementById('description'); // for text instructions
var eventContainer = document.getElementById('eventcontainer'); // for both forms
var finalForm = document.getElementById('finalform'); //for postcard text entry
var travelledToContainer = document.createElement('section');
travelledToContainer.setAttribute('id', 'travelcontainer');
mainContainer.appendChild(travelledToContainer);

function Adventure(name, image, text, blurb, teaser) { // teaser on mouseover, blurb on flip, text if clicked
  this.name = name;
  this.image = `img/${image}`;
  this.thumbnail = `thumbs/${image}`;
  this.text = text;
  this.blurb = blurb;
  this.teaser = teaser;
  allDestinations.push(this);
}

function Instructions(name, image, text, extra) {
  this.name = name;
  this.image = `img/${image}`;
  this.text = text;
  this.extra = extra;
  allInstructions.push(this);
}

// Positive, Neutral, Challenge Encounters, challenges 2 levels deep
function Encounter(name, encounter, text, yes, no, yesAttr, noAttr) {
  this.name = name;
  this.encounter = `img/${encounter}`; // image
  this.text = text; // description leading to choice
  this.yes = yes; // description if yes/no
  this.no = no;
  this.yesAttr = yesAttr; // badge if yes/no
  this.noAttr = noAttr;
  allEncounters.push(this);
}

new Adventure('Space Needle', 'space-needle.png', 'Long Descriptive Text about it', 'Few people know X about Y.', 'Click this awesome choice!');
new Adventure('Great Wheel', 'great-wheel.png', 'Long Descriptive Text about WHEEL', 'Few people know X about Y.', 'Click this awesome choice!');
new Adventure('Pike Place', 'pike-place.png', 'Long Descriptive Text about PIKE', 'Few people know X about Y.', 'Click this awesome choice!');
new Adventure('Waterfront', 'waterfront.png', 'Long Descriptive Text about WATERFRONT', 'Few people know X about Y.', 'Click THIS awesome choice!');
new Adventure('Gum Wall', 'waterfront.png', 'Long Descriptive Text about WATERFRONT', 'Few people know X about Y.', 'Click THIS awesome choice!');
new Adventure('Pacific Science Center', 'waterfront.png', 'Long Descriptive Text about WATERFRONT', 'Few people know X about Y.', 'Click THIS awesome choice!');
// new Adventure('Museum of Pop Culture', 'waterfront.png', 'Long Descriptive Text about WATERFRONT', 'Few people know X about Y.', 'Click THIS awesome choice!');
// new Adventure('Museum of Flight', 'waterfront.png', 'Long Descriptive Text about WATERFRONT', 'Few people know X about Y.', 'Click THIS awesome choice!');
// new Adventure('Kubota Garden', 'waterfront.png', 'Long Descriptive Text about WATERFRONT', 'Few people know X about Y.', 'Click THIS awesome choice!');
// new Adventure('Fremont Troll', 'waterfront.png', 'Long Descriptive Text about WATERFRONT', 'Few people know X about Y.', 'Click THIS awesome choice!');
// new Adventure('Chihuli Museum of Glass', 'waterfront.png', 'Long Descriptive Text about WATERFRONT', 'Few people know X about Y.', 'Click THIS awesome choice!');
// new Adventure('Golden Gardens', 'waterfront.png', 'Long Descriptive Text about WATERFRONT', 'Few people know X about Y.', 'Click THIS awesome choice!');
// new Adventure('Seattle Art Museum', 'waterfront.png', 'Long Descriptive Text about WATERFRONT', 'Few people know X about Y.', 'Click THIS awesome choice!');
// new Adventure('Seattle Aquarium', 'waterfront.png', 'Long Descriptive Text about WATERFRONT', 'Few people know X about Y.', 'Click THIS awesome choice!');
// new Adventure('Ballard Locks', 'waterfront.png', 'Long Descriptive Text about WATERFRONT', 'Few people know X about Y.', 'Click THIS awesome choice!');
// new Adventure('Starbucks Reserve Roastery', 'waterfront.png', 'Long Descriptive Text about WATERFRONT', 'Few people know X about Y.', 'Click THIS awesome choice!');


new Instructions('Welcome to our Adventure in Seattle Game!', 'skyline.jpg', 'If you choose to play, you\'ll be led on a virtual adventure around the city to see whichever sights you\'d like to see. You\'ll learn fun facts and trivia about each location along the way. At the end, you\'ll have a memento from your trip based on where you decided to go!', '');
new Instructions('How To Play', 'skyline2.jpg', 'Our virtual travel agency has arranged for you to tour a total of five destinations in Seattle. Click any of the image thumbnails at the top of the screen to visit that destination. While there, simply click the big image to be taken to a chance encounter along your way.'); 
new Instructions('Your Custom Postcard Awaits. . .', 'prepostcard.jpg', 'Whew! -- you have completed your journey of Seattle. Each step of your journey has been commemorated by a photo on your custom postcard. Now it\'s time to write your custom message. What would you like your postcard to say?');
new Instructions('Here is your custom postcard!', 'starting-image.png', 'Your very own virtual memento showcasing a few highlights from your trip. Click the button below if you\'d like to see postcards from previous travellers.');
new Instructions('Welcome back!', 'skyline.jpg', 'If you\'d like to play again, please enter your desired username for this journey.');

// should something like this be stored in separate JSON file instead?
new Encounter('Street Vendor', 'street-vendor.jpg', 'While you are there, you meet a street vendor selling freshly smoked salmon that smells incredible. He offers you a free sample and its taste is unrivaled. Would you like to take some home with you?', 'The opportunity is too good to pass up. You fork over the money and happily receive your smoked salmon. They\'re going to love it back at home.', 'You decide against the idea of carrying a bag of fish for the rest of your day and continue along your journey.', 'Golden Fish', 'Travel Light');
new Encounter('Satisfaction Guaranteed', 'travel.jpg', 'As you leave, you pass by a travel agent who flags you down. "Excuse me," she says. "I couldn\'t help but notice that you are from out of town and I just wanted to ask you whether you liked this spot on your Seattle trip. Some people love it, though it\'s not for everyone. Did you enjoy it?', '"Of course I love it!," you answer. "It would be crazy not to find it charming."', 'I\'m afraid I am one of those people," you admit. "I like it, but I guess it\'s just not for me.', 'Positive Pat', 'Negative Nelly');
new Encounter('Changing Weather', 'fog.jpg', 'During your time here, a heavy fog rolled in, obscuring your view. Luckily, you were able to capture a great photo beforehand. Are you happy with this image?', 'You are happy with the image and look forward to taking more at your next destination when the weather clears.', 'You shake your head, wishing you\'d had more of a chance to get just the right shot.', 'Positive Pete', 'Negative Nate');
new Encounter('Natural Accident', 'birds-event.jpg', 'While sightseeing, a bird overhead happened to poop on your shoulder. Seeing this, a fellow sightseer standing next to you offers you a spare Seahawks jersey. "It\'s an extra," he says. "I was overzealous and bought more than I\'ll ever need. It\'s yours if you\'d like to have it."\n Do you take the jersey?', '"Hey, thanks!" you say, taking the man\'s extra jersey. He smiles and heads off. His generosity leaves you feeling optimistic about what might come next.', '"Oh, no thanks," you reply, turning him down. "I\'m more of a soccer/tennis/bird-watcher anyway. I appreciate the offer, though."', 'Sports Fan', 'Bird Lover');
new Encounter('Discovery', 'wallet.jpg', 'While out and about, you come across a wallet. Checking inside, you find $40, but no cards or other forms of identification. There is a Lost and Found box not too far away. Do you return the $40 along with the wallet?', 'You decide that the Golden Rule applies here. If it had been your wallet, you would appreciate any chance of recovering its contents.', 'Deciding that it would be unlikely for a wallet without identification to be found by its proper owner, you pocket the cash.', 'Honest Abe', 'Finder\'s Keepers');

function renderElement(newElement, parentElement, obj, content, index) {
  if (newElement === 'img' && content === 'thumbnail') { // for thumbnails
    if (parentElement === selectionContainer) {
      var flipCard = document.createElement('div');
      flipCard.setAttribute('class', 'flip-card');
      parentElement.appendChild(flipCard);
      var inner = document.createElement('div');
      inner.setAttribute('class', 'flip-card-inner');
      flipCard.appendChild(inner);
      var front = document.createElement('div');
      front.setAttribute('class', 'flip-card-front');
      inner.appendChild(front);
      var frontElement = document.createElement(newElement);
      frontElement.src = obj.thumbnail;
      frontElement.title = obj.teaser;
      frontElement.alt = obj.name;
      frontElement.setAttribute('id', index);
      front.appendChild(frontElement);
      var back = document.createElement('div');
      back.setAttribute('class', 'flip-card-back');
      inner.appendChild(back);
      back.addEventListener('click', thumbClick);
      var flipEl = document.createElement('p');
      flipEl.textContent = obj.blurb;
      flipEl.setAttribute('class', 'text');
      back.appendChild(flipEl);
    } else {
      var thumb = document.createElement(newElement); // for chosen images at bottom
      thumb.src = obj.thumbnail;
      thumb.title = obj.teaser;
      thumb.alt = obj.name;
      parentElement.appendChild(thumb);
    }
  } else if (newElement === 'img' && content === 'image') {// for large images
    parentElement.innerHTML = '';
    var childElement = document.createElement(newElement);
    childElement.src = obj.image;
    childElement.title = obj.teaser;
    childElement.alt = obj.name;
    parentElement.appendChild(childElement);
    childElement.addEventListener('click', clickBigImage);
  } else if (newElement === 'img' && content === 'encounter') {// for encounter images
    parentElement.innerHTML = '';
    var childElement = document.createElement(newElement);
    childElement.src = obj.encounter;
    childElement.title = obj.teaser;
    childElement.alt = obj.name;
    parentElement.appendChild(childElement);

  } else {
    parentElement.innerHTML = '';
    var childElement = document.createElement(newElement);// for text
    childElement.textContent = obj[content];
    parentElement.appendChild(childElement);
  }
}

function beginAdventure() {
  finalForm.setAttribute('style', 'display:none;'); // hide final button
  // display starting image and give directions
  renderElement('h2', headerContainer, allInstructions[0], 'name');
  imageContainer.innerHTML = '';
  var welcome = document.createElement('p');
  welcome.textContent = allInstructions[0]['extra'];
  //  welcome.setAttribute('class', 'star-wars crawl');
  imageContainer.appendChild(welcome);
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
  for (var j = 0; j < allEncounters.length; j++) {
    remainingEncounters[j] = allEncounters[j];
  }
  renderElement('h2', headerContainer, allInstructions[1], 'name');

  renderElement('p', descriptionContainer, allInstructions[1], 'text');
  imageContainer.innerHTML = '';
  var childElement = document.createElement('img');
  childElement.src = allInstructions[1].image;
  childElement.title = allInstructions[1].teaser;
  childElement.alt = allInstructions[1].name;
  imageContainer.appendChild(childElement);// rending
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
  if (actualScenes === maxScenes) {    // selection ends after 5 are chosen; users is presented with postcard form 
    var clickedDestination = event.target.alt;
    var popIndex = null;
    // actualScenes++;
    console.log(actualScenes);
    for (var i = 0; i < remainingPlaces.length; i++) {
      if (clickedDestination === remainingPlaces[i].name) {
        popIndex = i;
        console.log(i);
      }
    }
    pickedPlace = remainingPlaces.splice(popIndex, 1);
    chosenPlaces.push(pickedPlace);
    // console.log(chosenPlaces);
    // console.log(actualScenes);
    var stringifiedPlaces = JSON.stringify(chosenPlaces);
    localStorage.setItem('chosenimages', stringifiedPlaces);
    renderElement('img', travelledToContainer, pickedPlace[0], 'thumbnail');
    renderThumbnails();
    showNextScene();
    setTimeout(postcardInput, 5000);

    // postcardInput();
  }

  else if (actualScenes <= maxScenes) {    // selection ends after 5 are chosen; users is presented with postcard form 
    clickedDestination = event.target.alt;
    popIndex = null;
    // actualScenes++;
    // console.log(actualScenes);
    for (var i = 0; i < remainingPlaces.length; i++) {
      if (clickedDestination === remainingPlaces[i].name) {
        popIndex = i;
        // console.log(i);
      }
    }
    pickedPlace = remainingPlaces.splice(popIndex, 1);
    chosenPlaces.push(pickedPlace);
    // console.log(chosenPlaces);
    // console.log(actualScenes);
    var stringifiedPlaces = JSON.stringify(chosenPlaces);
    localStorage.setItem('chosenimages', stringifiedPlaces);
    renderElement('img', travelledToContainer, pickedPlace[0], 'thumbnail');
    renderThumbnails();
    showNextScene();
  } else {
    postcardInput();
  }
}

function showNextScene() {
  eventContainer.innerHTML = '';
  renderElement('h2', headerContainer, pickedPlace[0], 'name');
  renderElement('img', imageContainer, pickedPlace[0], 'image');
  renderElement('p', descriptionContainer, pickedPlace[0], 'text');
}

function clickBigImage(event) {  // flip image to trigger Encounter
  event.preventDefault();
  selectionContainer.innerHTML = ''; // to prevent clicking away
  while (doneEncounters.includes(currentEncounterIndex)) {
    currentEncounterIndex = Math.floor(Math.random() * Math.floor(remainingEncounters.length));// ensure no duplicates
  }
  doneEncounters.push(currentEncounterIndex);
  renderElement('h2', headerContainer, remainingEncounters[currentEncounterIndex], 'name');
  renderElement('img', imageContainer, remainingEncounters[currentEncounterIndex], 'encounter');
  renderElement('p', descriptionContainer, remainingEncounters[currentEncounterIndex], 'text');
  eventContainer.innerHTML = '';
  var optionYes = document.createElement('a');
  var optionNo = document.createElement('a');
  optionNo.setAttribute('style', 'text-decoration: none; color: black; padding: 5px; margin: 10px; background-color:#ccc; border: 1px solid black;');
  optionYes.setAttribute('style', 'text-decoration: none; color: black; padding: 5px; margin: 10px; background-color:#ccc; border: 1px solid black;');
  optionYes.title = 'If Yes';
  optionNo.title = 'If No';
  var yes = document.createTextNode('Yes');
  optionYes.appendChild(yes);
  var no = document.createTextNode('No');
  optionNo.appendChild(no);
  eventContainer.appendChild(optionYes);
  eventContainer.appendChild(optionNo);
  document.removeEventListener('click', clickBigImage); // prevents accidentally clicking away
  optionNo.addEventListener('click', encounterButtonNoClick);
  optionYes.addEventListener('click', encounterButtonYesClick);
}

function encounterButtonYesClick(event) { // --------- for YES clicks
  event.preventDefault();
  eventContainer.innerHTML = '';
  renderElement('p', descriptionContainer, remainingEncounters[currentEncounterIndex], 'yes');
  // you earned __
  eventContainer.innerHTML = 'You earned the ' + remainingEncounters[currentEncounterIndex].yesAttr + ' badge!';
  encounterBadges.push(currentEncounterIndex.yesAttr);
  encounterFinished();
}

function encounterButtonNoClick(event) { // -------- for NO clicks
  event.preventDefault();
  eventContainer.innerHTML = '';
  renderElement('p', descriptionContainer, remainingEncounters[currentEncounterIndex], 'no');
  encounterBadges.push(currentEncounterIndex.noAttr);
  eventContainer.innerHTML = 'You earned the ' + remainingEncounters[currentEncounterIndex].noAttr + ' badge!';
  encounterFinished();
}

function encounterFinished() {
  //"choose your next destination"
  headerContainer.innerHTML = '';
  var next = document.createElement('h2');
  next.textContent = 'Click any thumbnail to select your next destination.';
  headerContainer.appendChild(next);
  renderThumbnails();
}

function tallyEncounterBadges() { // -------- at end, to store and render with postcard.
  console.log(encounterBadges);
}

function postcardInput() {
  selectionContainer.innerHTML = '';
  eventContainer.innerHTML = '';
  renderElement('h2', headerContainer, allInstructions[2], 'name');
  renderElement('img', imageContainer, allInstructions[2], 'image');
  renderElement('p', descriptionContainer, allInstructions[2], 'text');
  finalForm.setAttribute('style', 'display:initial;');
  finalForm.addEventListener('submit', postcardPull);
}

function postcardPull(event) {
  event.preventDefault();
  postcardMessage = event.target.postcardinput.value;
  localStorage.setItem('postcardmessage', postcardMessage);
  finalForm.setAttribute('style', 'display:none;');
  revealPostcard();
}

function revealPostcard() {
  eventContainer.innerHTML = '';
  imageContainer.innerHTML = '';
  travelledToContainer.innerHTML = '';
  renderElement('h2', headerContainer, allInstructions[3], 'name');
  renderElement('p', descriptionContainer, allInstructions[3], 'text');
  var cardTextEl = document.createElement('p');
  cardTextEl.textContent = postcardMessage + ' ' + postmark;
  cardTextEl.setAttribute('id', 'postcardmessage');
  imageContainer.appendChild(cardTextEl);
  var cardFromEl = document.createElement('p');
  cardFromEl.textContent = '--- ' + userName;
  cardFromEl.setAttribute('id', 'postcardusername'); // for CSS styling
  imageContainer.appendChild(cardFromEl);
  // render badges from array  called encounterBadges
  for (var i = 0; i < chosenPlaces.length; i++) {
    var childElement = document.createElement('img');
    childElement.src = chosenPlaces[i][0].thumbnail;
    imageContainer.appendChild(childElement);
  }
  var viewAll = document.createElement('a');
  viewAll.setAttribute('style', 'text-decoration: none; color: black; padding: 5px; margin: 10px; background-color:#ccc; border: 1px solid black;');
  var resultsPage = document.createTextNode('View All Postcards');
  viewAll.appendChild(resultsPage);
  viewAll.title = 'Click Here to how awesome your postcard is compared to those from previous travelers';
  viewAll.href = 'postcard.html';
  eventContainer.appendChild(viewAll);
}

if (storedUserName) {
  finalForm.setAttribute('style', 'display:none;'); // hide final button
  // display starting image and give directions
  renderElement('h2', headerContainer, allInstructions[4], 'name');
  imageContainer.innerHTML = '';
  var welcome = document.createElement('p');
  welcome.textContent = allInstructions[0]['extra'];
  //  welcome.setAttribute('class', 'star-wars crawl');
  imageContainer.appendChild(welcome);
  // renderElement('img', imageContainer, allInstructions[4], 'image');
  renderElement('p', descriptionContainer, allInstructions[4], 'text');
  eventContainer.addEventListener('submit', inputName);
} else {
  beginAdventure();
}
