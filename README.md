# Mementoize Your Virtual Seattle Adventure

User is guided through a journey around Seattle to destinations of their choosing, and have the opportunity to design a custom postcard as a virtual gift for someone who is unable to do the tour in person, or for themselves to commemorate the trip.

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

User arrives at home page which includes info about the game, form for user name input and opportunity to play the game. Game renders to the home page once play game has been clicked. Fifteen different destination images are rendered to the page, as options for the user to select which destination they'd like to go to first. As a user selects a destination, it is removed from the clickable options, and is put at the bottom of the page to show the already picked destinations. The remaining options that have not yet been chosen remain clickable at the top of the page to go to next. Each destination provides a picture and info about the landmark or unique place in Seattle. Each landmark can be clicked on for an extra encounter in the city. Once a user has visited five destinations, they are given the opportunity to enter a message for their custom postcard, and then are prompted to view their postcard with thumbnail images of the places visited on their virtual tour.
​
### Scope

User is presented with thumbnail images of 15 total destinations.

User can choose a total of 5. After a user clicks one image, it moves to the bottom of the page and cannot be selected again.

Second array of previously selected choices.

Mouseover effect of thumbnail gives some teaser information.

The thumbnail images remain constant until the results page.

Home page includes description and form element for username. After entering username, user is presented with thumbnail images to click from. Once the user clicks a thumbnail, they are taken to a large image of that destination with info and facts about the destination. Each main image can be clicked on for another layer of encounter within the city. 

Postcard Elements
​Postcard has user name, custom text via form submission, and five image thumbnails based on adventure chosen.
Populate images from localstorage based on journey taken.
​User input: What would you like to say on your postcard (then fill in script face).

## Requirements and Details

[REQUIREMENTS.md](REQUIREMENTS.md)

## References

Consulted [StackOverflow](https://stackoverflow.com/questions/17087636/how-to-save-data-from-a-form-with-html5-local-storage) for additional specifics on implementing localStorage with HTML input forms.

## Image Credits

- birds-event.jpg photo by Shakeb Tawheed from Pexels
- street-vendor.jpg photo by Kampus Production from Pexels
- travel.jpg photo by Andrea Piacquadio from Pexels
- fog.jpg photo by João Cabral from Pexels
- skyline.jpg photo by Chait Goli from Pexels
- skyline2.jpg photo by Josh Fields from Pexels
- prepostcard.jpg photo by Ylanite Koppens from Pexels
- golden-gardens.jpg photo by Joe Mabel (Creative Commons)
- golden-gardens2.jpg photo by Stephen Webber
- golden-gardens3.jpg photo by Stephen Webber
- seattle-aquarium.jpg photo by Joe Mabel (Creative Commons)
- seattle-aquarium2.jpg photo by Joe Mabel (Creative Commons)
- wallet.jpg photo by Artem Beliaikin
- Starbucks images: https://www.starbucksreserve.com/en-us/locations/seattle, https://www.jtm-construction.com/wp-content/uploads/2015/05/HERO1.jpg
- MOHAI images: https://mohai.org/wp-content/uploads/2016/12/Home_Landing1-2400x1350.jpg, https://media-cdn.tripadvisor.com/media/photo-s/03/5e/4d/d5/museum-of-history-industry.jpg
- Fremont Troll images: https://upload.wikimedia.org/wikipedia/en/d/d3/FremontTroll.jpg
- Chihuly images: https://www.chihulygardenandglass.com/visit/plan-your-visit

## Destinations Content Credits

- MoPOP: https://www.mopop.org//about-mopop/
- Pacific Science Center: https://www.pacificsciencecenter.org/about/
- Space Needle: https://www.spaceneedle.com/facts-1
- Museum of Flight: https://www.museumofflight.org/About
- Gum Wall: https://www.tripsavvy.com/weird-facts-about-seattles-gum-wall-4134249
- Kubota Garden: https://www.tripsavvy.com/weird-facts-about-seattles-gum-wall-4134249
- Great Wheel: https://www.historylink.org/File/11051
- Pike Place Market: http://pikeplacemarket.org/history
- Chihuly Garden and Glass: https://www.chihulygardenandglass.com/about/story
- Fremont Troll: https://www.seattletimes.com/life/a-brief-history-of-the-fremont-troll-a-menace-that-evokes-a-smile/
- Seattle Aquarium: https://www.seattleaquarium.org/who-we-are
- Ballard Locks: https://www.nws.usace.army.mil/Missions/Civil-Works/Locks-and-Dams/Chittenden-Locks/
- Golden Gardens: https://www.seattle.gov/parks/find/parks/golden-gardens-park
- Seattle Art Museum: http://www.seattleartmuseum.org/about-sam
- MOHAI: https://historylink.org/File/11068
