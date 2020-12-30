'use strict';

var pickedPlace = [];
var maxScenes = 5;
var actualScenes = 0;
var destinationsLeft = 5;
var userName = '';
var allDestinations = [];
var remainingPlaces = []; //This array is used to populate the thumnails of remaining choices
var chosenPlaces = [];
var allInstructions = [];
var postcardMessage = '';
var storedUserName = JSON.parse(localStorage.getItem('username'));
//var thumbIndex = 0;
var thumbnailsToDisplay = 10;
var storedPostcardImages = [];
var storedPostcardMessage = '';
var allAdventurers = JSON.parse(localStorage.getItem('adventurers')) || [];
console.log('You are here' , allAdventurers);
var date = new Date();
var unstringifiedPostmark = date.toLocaleDateString();
var postmark = JSON.stringify(unstringifiedPostmark); // get local date/time for message postmark
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

function Adventurer(username, postmark, images, message) {
  this.username = username;
  this.postmark = postmark;
  this.images = images;
  this.message = message;
  allAdventurers.unshift(this);
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

new Adventure('Space Needle', 'spaceneedle.jpg', 'The Seattle Space Needle is an observation tower which was built in the city of Seattle, Washington, in 1962. The tower was built in honor of the 1962 World’s Fair. It hosted in excess of 2.3 million visitors over the duration of the fair. Nowadays, it receives more than a million visitors annually, and is the most popular tourist attraction in the Northwest. One of the most notable and most famous Space Needle facts concerns its impressive height. The tower is 605 ft tall, took 400 days to build, and at the time it was built it was the tallest structure west of the Mississippi River.', 'Views from 605ft up!', 'The Space Needle is 605ft tall and offers a great view of the city!');
new Adventure('Great Wheel', 'great-wheel.jpeg', 'Seattle was the third city in North America to offer a wheel of this design, it is currently the tallest ferris wheel on the west coast standing at an incredible 175 ft.  The Great Wheel has 42 enclosed gondolas, including a “VIP” gondola equipped with leather seats, all fabricated in Germany. A ride on the wheel costs $13 and takes about 15 minutes, allowing three revolutions complete with views of the city and Puget Sound.', 'Beautiful views of the waterfront!', 'The Great Wheel goes up 175ft, includes three revolutions with beautiful city views per ride!');
new Adventure('Pike Place', 'pikeplace.jpg', 'First opened on August 17, 1907, this market is now considered the oldest continuously-running public farmer’s market in the country. It serves as a place of business for many small farmers, craftspeople and merchants. Pike Place Market is Seattle\'s most popular tourist destination and the 33rd most visited tourist attraction in the world, with more than 10 million annual visitors.', 'Most popular Seattle attraction!', 'Attracts 10 million visitors per year.');
new Adventure('Gum Wall', 'gumwall.jpg', 'Not too far from Pike Place Market, the Seattle Gum Wall is covered in thousands of pieces of chewing gum that have been placed on the side of Post Alley\'s Market Theater. It\'s been gathering gum for over 20 years, since the early 1990s when people waiting for shows at nearby Unexpected Productions would stick gum to the wall and coins to the gum to pass the time. About 50 feet long, it was fully cleared off for the first time in November 2015. Yes, it\'s just a wall covered in sticky, gooey, chewed gum, but it\'s the history and sheer weirdness that draws visitors.', 'Fifty feet of gum!', 'Likely one of the most unique visits!');
new Adventure('Pacific Science Center', 'pacscicenter.jpg', 'In 1962 the Seattle World\'s Fair made headlines and millions came to explore the wonders of science at the United States Science Pavilion – known today as Seattle\'s Pacific Science Center. When planning for the Seattle World\'s Fair, the authorization law had required the buildings to be used for governmental purposes once the fair concluded. The U.S. Science Pavilion was intended to double as a warehouse for the General Services administration, and later be torn down. Today Pacific Science Center is composed of eight buildings, including two IMAX theaters (one of only a few places in the world with more than one IMAX theater), one of the world\'s largest laser dome theaters, a tropical butterfly house, a planetarium, and hundreds of hands-on science exhibits. In addition to a number of permanent exhibits the Center also hosts a variety of traveling and temporary exhibits.', 'Home to two IMAX theaters!', 'Interesting and diverse traveling exhibits, always worth a stop.');
new Adventure('Museum of Pop Culture', 'mopop.jpg', 'The museum was formerly known as Experience Music Project, Science Fiction Museum and Hall of Fame (EMP|SFM) and later EMP Museum until November 2016, has initiated many public programs. These include "Sound Off!", an annual 21-and-under battle-of-the-bands that supports the all-ages scene; and "Pop Conference", an annual gathering of academics, critics, musicians, and music buffs. Exhibits covering pop culture, from the art of fantasy, horror cinema, and video games to science fiction literature and costumes from screen and stage. The world\'s largest collection of artifacts, hand-written lyrics, personal instruments, and original photographs celebrating the music and history of Seattle musician Jimi Hendrix and the band Nirvana.', 'Largest collection of Jimi Hendrix memorabilia.', 'MoPOP offers an amazing collection unlike anywhere else in the world!');
new Adventure('Museum of Flight', 'flight.jpg', 'Established in 1965 and fully accredited by the American Alliance of Museums as the largest private air and space museum in the world. Hosts the world\'s largest K-12 educational programs and attracts over 500,000 visitors every year. The museum\'s education programs grew significantly with the building of a Challenger Learning Center in 1992. This interactive exhibit allows students to experience a Space Shuttle mission, which includes a mock-up NASA mission control, and experiments from all areas of space research.', 'Largest private air and space museum.', 'World renowed air and space museum!');
new Adventure('Kubota Garden', 'kubota.jpg', 'Kubota Garden is a 20-acre (81,000 m²) Japanese garden in the Rainier Beach area. Major features of the Kubota Garden include the Kubota Terrace, the Bamboo Grove, the Necklace of Ponds, the Mountainside, and the Tom Kubota Stroll Garden. Fujitaro Kubota emigrated from Japan in 1907 and was a self-taught gardener. In 1923, he started the Kubota Gardening Company. The core of Kubota Garden is a Historical Landmark in the City of Seattle. There is more than 400 tons of stone in the 20 acres of land that makes up Kubota Garden.', 'Twenty beautiful acres to enjoy!', 'Wonderful and tranquil escape from the city!');
new Adventure('Museum of History and Industry', 'mohai.jpg', 'Originally opened in Seattle\'s Montlake neighborhood in 1952, the Museum of History and Industry (MOHAI) reopened in its new South Lake Union location on December 29, 2012. Now located in the historic Naval Reserve Building on the shores of Lake Union and serving as a centerpiece of the city\'s recently developed Lake Union Park. Located on a total of 12 acres transferred by the navy to the city after the armory was closed. The museum is filled with artifacts, documents, and photographs collected by the Seattle Historical Society since the 1910s.', 'Beautiful 12 acres on Lake Union', 'Filled with artifacts collected since the 1910s.');
new Adventure('Fremont Troll', 'troll.png', 'The Fremont Troll found its home under the Aurora Bridge that runs through Seattle about three decades ago. In the fall of 1990, Fremont residents voted from numerous other proposals to create the troll with neighborhood funds. The choice of the troll served as a metaphor for what the area was going through at the time - escaping traffic and development. The sculpture itself was the brainchild of Seattle architect-artists Will Martin and Ross Whitehead, plus additional traveling artists. It is recorded that the upper structure of the troll contains 80 sacks of cement and 7 yards of sand, with an additional two yards of concrete for the foundation.', 'A troll of cement and sand!', 'Unique and only found in Seattle destination!');
new Adventure('Chihuly Museum of Glass', 'chihuly.jpg', 'Based on the work of Dale Chihuly, a Northwest based world-renowned glass artist who led the development of glass blowing as a fine art. His work is included in more than 200 museum collections worldwide. He has been the recipient of many awards including twelve honorary doctorates and two fellowships from the National Endowment for the Arts. When the opportunity to reinvigorate Seattle Center arose, the Wright family (family ownership and management of the Space Needle) invited Chihuly to present a collection of his work in a location right at the base of the Space Needle. Chihuly designed an Exhibition Hall, a Garden installation, and a Glasshouse. Through its community partners, Chihuly Garden and Glass supports opportunities for education and involvement in the arts. The mission of the museum is to celebrate the region’s creative energy and inspire visitors to engage with the region’s cultural community.', 'Most colorful stop in town!', 'Located at the base of the Space Needle.');
new Adventure('Golden Gardens', 'golden-gardens.jpg', 'Popular sandy beach attraction located in Ballard, offering extraordinary views of Puget Sound and the Olympic Mountains. The park features two wetlands, a short loop trail, and restored beach. Named and developed by Harry Treat in 1907 as an attraction at the end of the new electric car lines being built by realtors to transport people for outings out of town. Wonderful spot for a sunny day, complete with off leash dog areas and beach volleyball.', 'Sandy beach in the city!', 'Extraordinary views of the city and Olympic Mountains.');
new Adventure('Seattle Art Museum', 'artmuseum.jpg', 'Located in the heart of downtown, Seattle Art Museum (SAM) has numerous collections, temporary installations and special exhibitions from around the world. Collections include Asian, African, Ancient American, Ancient Mediterranean, Islamic, European, Oceanic, Asian, American, modern and contemporary art, and decorative arts and design. Additional affiliated attractions include the Asian Art Museum which resides in the SAM landmark 1933 Art Deco building on Capitol Hill, as well as the Olympic Sculpture Park, an award winning nine-acre outdoor park on the waterfront that is free and open to the public to enjoy.', 'Beautiful museum in downtown.', 'Amazing exhibits from around the world.');
new Adventure('Ballard Locks', 'ballardlocks.jpg', 'Construction of the Lake Washington Ship Canal and Hiram M. Chittenden Locks was completed in 1917 by the U.S Army Corps of Engineers. Created for three main purposes: maintaining the water level of fresh water in Lake Washington and Lake Union at 20-22 feet above sea level, preventing the mixing of sea water with fresh water, and to move boats from the water level of the lakes to the water level of Puget Sound and vice versa. The Locks connect the waters of Lake Washington, Lake Union, and Salmon Bay to the tidal waters of Puget Sound, and allow recreational and commercial vessels to travel to the docks and warehouses of the harbor in Seattle. The complex includes two locks, one small and one large, as well as a spillway with six gates to assist in water-level control. A fish ladder is integrated into the locks for migration of fish as well.', 'Boats, water, and fish!', 'Interesting destination and amazing engineering!');
new Adventure('Seattle Aquarium', 'seattle-aquarium.jpg', 'Opened in 1977, the Seattle Aquarium was owned and operated by the City of Seattle Department of Parks and Recreation until 2010 when the nonprofit Seattle Aquarium Society assumed its management. In 2007, the Aquarium opened a major expansion adding 18,000 square feet of space including a 120,000 gallon exhibit. The Seattle Aquarium is the ninth largest aquarium in the U.S. by attendance, and has hosted over 27 million visitors and provided marine conservation education to over two million school children since its opening. The animal collection is housed within six major exhibits: Window on Washington, Life on the Edge, Pacific Coral Reef, Birds and Shores, Underwater Dome and Marine Mammals.', 'Great waterfront attraction!', 'Dozens of marine species, great stop for kids!');
new Adventure('Starbucks Reserve Roastery', 'starbucks.jpg', 'First opened in Seattle’s Capitol Hill neighborhood in December 2014, the Roastery is an immersive and dramatic expression of Starbucks passion for coffee. Located just nine blocks from the original Starbucks Pike Place store, this is a great stop for any coffee lover. Rare Starbucks reserve coffees are roasted on site and eight distinctive coffee-prep methods are on display to watch, taste, and learn. The entire coffee making process unfolds within the building, raw green coffee beans stored in massive silos are roasted, ground and brewed in an industrial assembly line that winds, dips and soars across the entire space.', 'The whole coffee process!', 'Beautiful location with a detailed look at coffee. Something for everyone to enjoy!');

new Instructions('Welcome to our Adventure in Seattle Game!', 'skyline.jpg', 'If you choose to play, you\'ll be led on a virtual adventure around the city to see whichever sights you\'d like to see. You\'ll learn fun facts and trivia about each location along the way. At the end, you\'ll have a memento from your trip based on where you decided to go!', ''); // ----- ADD MOUSEOVER TEXT TO THESE ----
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
      back.setAttribute('id', obj.name);
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
  userName = JSON.stringify(event.target.username.value);
  storedUserName = event.target.username.value;
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
  imageContainer.appendChild(childElement);
  renderThumbnails();
}

function renderThumbnails() {
  selectionContainer.innerHTML = '';
  for (var i = 0; i < remainingPlaces.length; i++) {
    renderElement('img', selectionContainer, remainingPlaces[i], 'thumbnail', i); // render only ten, using thumbnailsToDisplay to iterate
  }
}

function thumbClick(event) {   // user has clicked thumbnail to choose next destination.
  actualScenes++;
  if (actualScenes === maxScenes) {    // selection ends after 5 are chosen; users is presented with postcard form 
    var clickedDestination = event.currentTarget.id;
    var popIndex = null;
    for (var i = 0; i < remainingPlaces.length; i++) {
      if (clickedDestination === remainingPlaces[i].name) {
        popIndex = i;
      }
    }
    pickedPlace = remainingPlaces.splice(popIndex, 1);
    chosenPlaces.push(pickedPlace[0]);
    var stringifiedPlaces = JSON.stringify(chosenPlaces);
    storedPostcardImages = chosenPlaces;
    localStorage.setItem('chosenimages', stringifiedPlaces);
    renderElement('img', travelledToContainer, pickedPlace[0], 'thumbnail');
    // renderThumbnails();
    selectionContainer.innerHTML = '';
    showNextScene();

    //    setTimeout(postcardInput, 5000);
    pauseOnLast();
    // postcardInput();
  }

  else if (actualScenes < maxScenes) {    // selection ends after 5 are chosen; user is presented with postcard form 
    clickedDestination = event.currentTarget.id;
    popIndex = null;
    // actualScenes++;
    for (var i = 0; i < remainingPlaces.length; i++) {
      if (clickedDestination === remainingPlaces[i].name) {
        popIndex = i;
      }
    }
    pickedPlace = remainingPlaces.splice(popIndex, 1);
    chosenPlaces.push(pickedPlace[0]);
    console.log(pickedPlace);
    // var stringifiedPlaces = JSON.stringify(chosenPlaces);
    // localStorage.setItem('chosenimages', stringifiedPlaces);
    renderElement('img', travelledToContainer, pickedPlace[0], 'thumbnail');
    renderThumbnails();
    showNextScene();
  } else {
    // pauseOnLast(); this is a good idea if i can load it from the first one without doubling.set a counter to iterate from first one..?
    //    postcardInput();
  }
}

function pauseOnLast() {
  var continueButton = document.createElement('a');
  continueButton.setAttribute('style', 'text-decoration: none; color: black; padding: 5px; margin: 10px; background-color:#ccc; border: 1px solid black;');
  continueButton.title = 'Click to Continue';
  var button = document.createTextNode('Next Page');
  continueButton.appendChild(button);
  eventContainer.appendChild(continueButton);
  //document.removeEventListener('click', clickBigImage); // prevents accidentally clicking away
  continueButton.addEventListener('click', postcardInput);

}

function showNextScene() {
  destinationsLeft = maxScenes - actualScenes; // count down for sake of displaying how many are left
  if (destinationsLeft === 0) {
    eventContainer.innerHTML = '';
  } else if (destinationsLeft === 1) {
    var remainingMessage = 'You have ' + destinationsLeft + ' choice remaining. Make it count!';
    eventContainer.innerHTML = remainingMessage;
  } else {
    var remainingMessage = 'You have ' + destinationsLeft + ' choices remaining.';
    eventContainer.innerHTML = remainingMessage;
  }
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
  postcardMessage = JSON.stringify(event.target.postcardinput.value);
  storedPostcardMessage = event.target.postcardinput.value;
  localStorage.setItem('postcardmessage', postcardMessage);
  finalForm.setAttribute('style', 'display:none;');
  new Adventurer(storedUserName, unstringifiedPostmark, storedPostcardImages, storedPostcardMessage);
  localStorage.setItem('adventurers', JSON.stringify(allAdventurers));
  console.log(allAdventurers);
  //revealPostcard();
  // showStoredPostcard();
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

//

function showStoredPostcard() {
  // if (storedUserName && storedImages && storedPostcardMessage) {
  //   var parsedUserName = JSON.parse(storedUserName);
  //   var parsedImages = JSON.parse(storedImages); // this probably needs brackets or something
  //   var parsedMessage = JSON.parse(storedPostcardMessage);
  // } else {
  //   previousCardsToDisplay = 5;
  // }
  // render the user's postcard
  var retrievedMessage = localStorage.getItem('postcardmessage');
  var retrievedImages = localStorage.getItem('chosenimages');
  console.log('we are here', retrievedMessage);
  storedPostcardMessage = JSON.parse(retrievedMessage);///--- not defined
  storedPostcardImages = JSON.parse(retrievedImages);
  var retrievedName = localStorage.getItem('username');
  storedUserName = JSON.parse(retrievedName);
  for (var i = 0; i < storedPostcardImages.length; i++) {
    var childElement = document.createElement('img');
    childElement.src = storedPostcardImages[i].thumbnail;
    eventContainer.appendChild(childElement);
  }

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
