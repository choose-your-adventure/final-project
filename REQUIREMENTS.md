# Product Vision

User designs a custom postcard as a virtual gift for someone who is unable to do the tour in person.
​

## Scope

User is presented with thumbnail images of 10 total destinations.

User can choose a total of 5. After a user clicks one image, it grays out and cannot be selected again.

Second array of previously selected choices.

Mouseover effect of thumbnail gives some teaser information.

The thumbnail images remain constant until the results page.

Home page includes description and form element for username. After entering username, user is presented with thumbnail images to click from. Once clicking an image, that replaces the intro text and grays out that image. When the user clicks the next image, that image fills the main section. The main image can be clicked to reveal text about the scene.

Postcard Elements
​Postcard has user name, custom text via form submission, and five image thumbnails based on adventure chosen.
Populate images from localstorage based on journey taken.
​User input: What would you like to say on your postcard (then fill in script face).

## PAGE CONTENTS

## HTML

*index.html*: intro screen, gameplay.

Includes:
nav with links to about us and view postcards
heading with logo
main section featuring image
main section with descriptive text
main section with text input field, later replaced by adventure options)
main section with adventure options (10 image thumbnails)
footer

*Aboutus.html*: about us
nav with links to play game and view postcards
heading with logo
main section featuring 4 images and bio for each person
footer

*Results.html*: postcard
nav with links to about us and view postcards
heading with logo
main section featuring postcard image with 5 chosen destination thumbnails and user name in FROM section
main section with descriptive text
main section with text input field which upon submission appends to postcard element

## ​CSS

Content is centered horizontally

Heading logo in custom font face

User can flip adventure image to reveal text onClick
nav element = full width, right aligned 

Hovering on thumbnail image reveals teaser text and enlarges image.

Postcard text style is script

## JS

maxScenes = 5
actualScenes = 0

userName stores user form entry. After game completion, userName, postcard text and 5 destination choices are stored to localstorage.

Adventure constructor gets fed 10 destinations to instantiate. each Adventure destination instance has these properties: image, text, description, mouseover teaser text, and this.push to allDestinations array.

allDestinations stores these instances

remainingPlaces array stores the images that show as available in the thumbnails

Each destination that is selected gets pushed into chosenPlaces array. These images display as grayed out from other thumbnails. Potentially these images are popped from remainingPlaces

Event listener: user clicks thumbnail to choose next destination.
actualScenes++

The user is taken through a total of 5 scenes. When 5 is reached, game ends. User is sent to results page revealing the postcard.

nameInput() function receives userName form submission, clear away form, and showNextScene() 

showNextScene() function clears away previous image and text and render text and image in appropriate sections in DOM. and presents the choices in thumbnails./updates them if selected.

postcardInput() reveals a text input form. Upon submission, runs revealPostcard()

revealPostcard() function displays thumbnails from chosenPlaces array, username, and postcardinput form text (during the game). Then generates a link to load results.html to see all previous postcards as well, ranked in order of appearance (timestamp?).

On results page, a DOM p element is created within the postcard with that text. (Max characters on form entry to fit on postcard.)


## STRETCH GOALS

Increase to 20 destinations

Make nav element a dropdown

User is also offered a choice based on how they feel about each place (after they make the choice) -- this increments them a BADGE based on how they feel. (example - how did you like the beach?) Choice increments a counter to the user which is then measured at the results phase. a badge displays beneath postcard based on types of choices

Different postcard styling for thumbnails (choose theme)

Have an email form to send the postcard to someone.
