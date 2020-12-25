'use strict';

var storedUserName = localStorage.getItem('username');
var storedImages = localStorage.getItem('chosenimages');
var storedPostcardMessage = localStorage.getItem('postcardmessage');
var previousCardsToDisplay = 4;
var postcardImages = ['thumbs/space-needle.png', 'thumbs/seattle-sunset.png', 'thumbs/great-wheel.png', 'thumbs/pike-place.png', 'thumbs/waterfront.png']
var previousMessages = ['I got hit in the face by a fish but it\'s all good!', 'Wow! Changed my life. I\'ll never forget this trip.', 'With love from Seattle!', 'Did you realize there are over 100 words for fog in Seattle?', 'I can\'t wait to get back to Seattle someday.', 'It\'s cold and dark and I want to come home.'];
var previousSenders = ['Stephen', 'Carly', 'Clement', 'Mikey', 'Herman Melville'];
var postContainer = document.getElementById('allcards');

function makeRandom() {
  return Math.floor(Math.random() * Math.floor(postcardImages.length));
} // stretch goal: to ensure non-duplicates with these randoms

function renderElement(newElement, obj, content) {
  if (newElement === 'img' && content === 'thumbnail') { // for thumbnails
    var childElement = document.createElement(newElement);
    childElement.src = obj;
    postContainer.appendChild(childElement);
  } else {
    var childElement = document.createElement(newElement);// for text
    childElement.textContent = obj;
    postContainer.appendChild(childElement);
  }
}

function showStoredPostcard() {
  if (storedUserName && storedImages && storedPostcardMessage) {
    var parsedUserName = JSON.parse(storedUserName);
    var parsedImages = JSON.parse(storedImages);
    var parsedMessage = JSON.parse(storedPostcardMessage);
  } else {
    previousCardsToDisplay = 5;
  }
  // render the user's postcard


      // var retrievedMessage = localStorage.getItem('postcardmessage');
    // var retrievedImages = localStorage.getItem('chosenimages');
    // storedPostcardMessage = JSON.parse(retrievedMessage);
    // storedPostcardImages = JSON.parse(retrievedImages);
    // var retrievedName = localStorage.getItem('username');
    // storedUserName = JSON.parse(retrievedName);
    // // renders the postcard. (plus a timestamp would be cool).
    // for (var i = 0; i < storedPostcardImages.length; i++) {
    //   var childElement = document.createElement('img');
    //   childElement.src = storedPostcardImages[i].thumbnail;
    //   eventContainer.appendChild(childElement);
    // }


}

function showPreviousPostcards() {
  for (var i = 0; i < previousCardsToDisplay; i++) {
    for (var j = 0; j < 5; j++) {
      var randomIndex = makeRandom();
      renderElement('img', postcardImages[randomIndex], 'thumbnail');
    }
    renderElement('p', previousMessages[i], 'message');
    renderElement('p', previousSenders[i], 'sender');


  }
}
//showStoredPostcard();
showPreviousPostcards();