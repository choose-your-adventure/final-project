# Mementoize Your Virtual Seattle Adventure

User designs a custom postcard as a virtual gift for someone who is unable to do the tour in person, or for themselves.

## Team

- Carly Dekock
- Clement Buchanan
- Mikey Russell
- Stephen Webber

### Link to project management board [here](https://trello.com/b/bJfWkqyZ/choose-your-adventure)

## Wireframes

- [Wireframe - Home Page](prep-images/wireframe-home.jpeg)
- [Wireframe - Game Page](prep-images/wireframe-game.jpeg)
- [Wireframe - Results Page](prep-images/wireframe-results.jpeg)
- [Flowchart/Domain Model](prep-images/flowchart.png)

## Domain Model - More Info

User arrives at home page which includes info about the game, form for user name input and opportunity to play the game. Game renders to the home page once play game has been clicked. Ten different destination images are rendered to the page, as options for the user to select which destination they'd like to go to first. As a user selects a destination, it grays out and is no longer an option, leaving the remaining destination clickable to go to next. Each destination provides a picture and info about the landmark or unique place in Seattle. Once a user has visited five destinations, they are given the opportunity to view their postcard with thumbnail images of the places visited on their virtual tour. 
​
### Scope

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

## Requirements and Details

[REQUIREMENTS.md](REQUIREMENTS.md)

## References

Consulted [StackOverflow](https://stackoverflow.com/questions/17087636/how-to-save-data-from-a-form-with-html5-local-storage) for additional specifics on implementing localStorage with HTML input forms.

## Image Credits

birds-event.jpg photo by Shakeb Tawheed from Pexels
street-vendor.jpg photo by Kampus Production from Pexels
travel.jpg photo by Andrea Piacquadio from Pexels
fog.jpg photo by João Cabral from Pexels
skyline.jpg photo by Chait Goli from Pexels
skyline2.jpg photo by Josh Fields from Pexels
prepostcard.jpg photo by Ylanite Koppens from Pexels

golden-gardens.jpg photo by Joe Mabel (Creative Commons)
golden-gardens2.jpg photo by Stephen Webber
golden-gardens3.jpg photo by Stephen Webber
seattle-aquarium.jpg photo by Joe Mabel (Creative Commons)
seattle-aquarium2.jpg photo by Joe Mabel (Creative Commons)
wallet.jpg photo by Artem Beliaikin
