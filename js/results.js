'use strict';

var storedPostcardImages = [];
var storedPostcardMessage;
var storedUserName;
var storedPostmark;
var allAdventurers = [];
// var storedUserName = localStorage.getItem('username');
// var storedPostcardImages = localStorage.getItem('chosenimages');
// var storedPostcardMessage = localStorage.getItem('postcardmessage');
// var postmark = localStorage.getItem('postmark');
var previousCardsToDisplay = 5;
var postcardImages = ['thumbs/artmuseum.jpg', 'thumbs/ballardlocks.jpg', 'thumbs/chihuly.jpg', 'thumbs/flight.jpg', 'thumbs/golden-gardens.jpg', 'thumbs/gumwall.jpg'];
var previousMessages = ['I got hit in the face by a fish but it\'s all good!', 'Wow! Changed my life. I\'ll never forget this trip.', 'With love from Seattle!', 'There are over 100 words for fog in Seattle!', 'I can\'t wait to get back to Seattle someday.', 'It\'s cold and dark and I want to come home.'];
var previousPostmarks = ['9/22/2019', '2/1/2017', '5/13/2010', '11/11/1997', '12/31/1892'];
var previousSenders = ['Stephen', 'Carly', 'Clement', 'Mikey', 'Herman Melville'];
var postContainer = document.getElementById('allcards');
var imageContainer = document.getElementById('images');
// var messageContainer = document.getElementById('message');

function makeRandom() {
  return Math.floor(Math.random() * Math.floor(5));
}

function renderElement(newElement, parentElement, obj, content) {
  if (newElement === 'img' && content === 'thumbnail') { // for thumbnails
    var childElement = document.createElement(newElement);
    childElement.src = obj;
    parentElement.appendChild(childElement);
  } else if (content) {
    var childElement = document.createElement(newElement);// for text
    childElement.textContent = obj[content];
    parentElement.appendChild(childElement);
  } else {
    var childElement = document.createElement(newElement);// for text
    childElement.textContent = obj;
    parentElement.appendChild(childElement);
  }
}

function showStoredPostcard() {
  allAdventurers = JSON.parse(localStorage.getItem('adventurer'));
  // if (storedUserName && storedImages && storedPostcardMessage) {
  //   var parsedUserName = JSON.parse(storedUserName);
  //   var parsedImages = JSON.parse(storedPostcardImages); // this probably needs brackets or something
  //   var parsedMessage = JSON.parse(storedPostcardMessage);
  // } else {
  //   previousCardsToDisplay = 5;
  // }
  // var postmark = localStorage.getItem('postmark');
  // storedPostmark = JSON.parse(postmark);
  // var retrievedMessage = localStorage.getItem('postcardmessage');
  // var retrievedImages = localStorage.getItem('chosenimages');
  // console.log(JSON.parse(retrievedImages));
  // storedPostcardMessage = JSON.parse(retrievedMessage);///--- not defined
  // storedPostcardImages = JSON.parse(retrievedImages);
  // var retrievedName = localStorage.getItem('username');
  // storedUserName = JSON.parse(retrievedName);
  // for (var i = 0; i < storedPostcardImages.length; i++) {
  //   var childElement = document.createElement('img');
  //   childElement.src = storedPostcardImages[i].thumbnail;
  //   eventContainer.appendChild(childElement);
  // }
  //   console.log(`storedPostmark: ${storedPostmark}

  // storedPostcardMessage: ${storedPostcardMessage}

  // storedPostcardImages: ${storedPostcardImages}

  // storedUserName: ${storedUserName}
  // `);
  // console.log(storedPostcardImages);
}

function renderSavedPostcard() {
  allAdventurers = JSON.parse(localStorage.getItem('adventurers'));
  for (var i = 0; i < allAdventurers.length; i++) {
    var queue = []; // for ensuring random 5
    while (queue.length < 5) {
      var tempIndex = makeRandom(allAdventurers[i].images.length);
      while (queue.includes(tempIndex)) {
        tempIndex = makeRandom(allAdventurers[i].images.length);
      }
      queue.push(tempIndex);
    }
    // var allPostcardsContainer = document.getElementById('allcards'); // main body
    var postCard = document.createElement('section');
    var messageDiv = document.createElement('div');
    messageDiv.setAttribute('id', `storedmessage${i}`);
    messageDiv.setAttribute('class', 'message');
    // allPostcardsContainer.appendChild(postCard); // new card container
    imageContainer.appendChild(postCard);
    var imageOneEl = document.createElement('img'); // images
    var imageTwoEl = document.createElement('img');
    var imageThreeEl = document.createElement('img');
    var imageFourEl = document.createElement('img');
    var imageFiveEl = document.createElement('img');
    var imageOne = queue.shift();
    var imageTwo = queue.shift();
    var imageThree = queue.shift();
    var imageFour = queue.shift();
    var imageFive = queue.shift();
    imageOneEl.src = allAdventurers[i].images[imageOne].thumbnail;
    imageTwoEl.src = allAdventurers[i].images[imageTwo].thumbnail;
    imageThreeEl.src = allAdventurers[i].images[imageThree].thumbnail;
    imageFourEl.src = allAdventurers[i].images[imageFour].thumbnail;
    imageFiveEl.src = allAdventurers[i].images[imageFive].thumbnail;
    postCard.appendChild(imageOneEl);
    postCard.appendChild(imageTwoEl);
    postCard.appendChild(imageThreeEl);
    postCard.appendChild(imageFourEl);
    postCard.appendChild(imageFiveEl);
    postCard.appendChild(messageDiv);
    console.log(messageDiv);
    renderElement('p', messageDiv, allAdventurers[i], 'message');
    renderElement('p', messageDiv, allAdventurers[i], 'username');
    renderElement('p', messageDiv, allAdventurers[i], 'postmark');
  }
}


function renderPreviousCardImages() {
  for (var i = 0; i < previousCardsToDisplay; i++) {
    var queue = []; // for ensuring random 5
    while (queue.length < 5) {
      var tempIndex = makeRandom(postcardImages.length);
      while (queue.includes(tempIndex)) {
        tempIndex = makeRandom(postcardImages.length);
      }
      queue.push(tempIndex);
    }
    // var allPostcardsContainer = document.getElementById('allcards'); // main body
    var postCard = document.createElement('section');
    var messageDiv = document.createElement('div');
    messageDiv.setAttribute('id', `message${i}`);
    messageDiv.setAttribute('class', 'message');
    // allPostcardsContainer.appendChild(postCard); // new card container
    imageContainer.appendChild(postCard);
    var imageOneEl = document.createElement('img'); // images
    var imageTwoEl = document.createElement('img');
    var imageThreeEl = document.createElement('img');
    var imageFourEl = document.createElement('img');
    var imageFiveEl = document.createElement('img');
    var imageOne = queue.shift();
    var imageTwo = queue.shift();
    var imageThree = queue.shift();
    var imageFour = queue.shift();
    var imageFive = queue.shift();
    imageOneEl.src = postcardImages[imageOne];
    imageTwoEl.src = postcardImages[imageTwo];
    imageThreeEl.src = postcardImages[imageThree];
    imageFourEl.src = postcardImages[imageFour];
    imageFiveEl.src = postcardImages[imageFive];
    postCard.appendChild(imageOneEl);
    postCard.appendChild(imageTwoEl);
    postCard.appendChild(imageThreeEl);
    postCard.appendChild(imageFourEl);
    postCard.appendChild(imageFiveEl);
    postCard.appendChild(messageDiv);
    console.log(messageDiv);
    renderElement('p', messageDiv, previousMessages[i]);
    renderElement('p', messageDiv, previousSenders[i]);
    renderElement('p', messageDiv, previousPostmarks[i]);
  }
}

renderSavedPostcard();
renderPreviousCardImages();
// showStoredPostcard();


