# my-pokemon

## Foreword
This nuxt project is my first nuxt project, I finished this in 6 days, before this, I am just a Angular developer, I've learned a lot about nuxt and vue and I hope this will not be the last time I play nuxt.js (vue.JS), when I saw the exercice sent by HR, I was shocked, because I hadn't learnt Nuxt before and also vue.js, but I belived I can handle it, thanks to my knowledge of front-end and JavaScript, that's what it is now, I know there may be a lot of  shortages in this project, please forgive me for lack of nuxt's knowledge :blush:, and I hope that someone can tell me how to improve it. 
Thanks for watching this in advance :smile:	

### Manual for operate in the site
1. The pokemon list realised a caching at first time, when searched name, it will be filtered at local rather than in [PokéAPI](https://pokeapi.co/) , because there is no API for searching pokemon in documentation by searchterm that you typed (maybe I didn't find that).

2. Team System: 
    1. How to share your pokemon team?
        1. create your pokemon team first by add pokemon
        2. click the share button (here will get a query property team in your clipboard like `?team=name,name2...`)
    2. How to apply pokemon team from somewhere
        * just enter `?team=name,name2...` from clipboard at the end of url and thre will be a choice for you to select

3. Discuss some possibilities about loading only the pokemon which is visible at the screen 
    1. Realising a method to watch the scroll event, when the scroll bar is to the bottom of the screen, load a number of pkemons (from local or from server)

the end, Thanks for your time `:)`