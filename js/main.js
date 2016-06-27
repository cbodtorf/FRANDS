// Created by Caleb Bodtorf
// Date 6/24/2016

/*******************************
* MODULES
********************************/

// const _ = require('../node_modules/underscore/underscore');
const filter = require('./filter');
const tmpl = require('./templates');
// ajax.read(func, url)
// ajax.create(func)
// ajax.update(func, url, id)
// ajax.delete(func, url, id)
const ajax = require('./ajax');
const bottle = require('./bottle');


/*******************************
* ON READY: LOAD APP
********************************/

window.addEventListener('load', () => {
  console.log('page has loaded');
  app.init();
  setInterval(() => {
    ajax.read(app.getFriend, app.randoUrl);
  }, 2000);
})

const app = {
  randoUrl: 'https://randomuser.me/api/',
  savedUrl: 'http://tiny-tiny.herokuapp.com/collections/ghostfrand',
  feed: [],
  friends: [],

  init() {
    app.events();
    app.styles();
  },
  styles() {

  },

  /*******************************
  * EVENTS
  ********************************/

  events() {

    // header/nav clicks
    let menu = document.getElementById("menu");
    menu.addEventListener('click', () => {
      menu.parentNode.style.transform = "translateY(-260px)";
    })

    let home = document.getElementById("home");
    home.addEventListener('click', () => {
      menu.parentNode.style.transform = "translateY(0)";
    })

    // click ghost to capture
    bottle.iChooseYou(app.randoUrl);

  },

  /*******************************
  * POPULATE MAIN FEED
  ********************************/

  getFriend(response) {
    let friend = response.results[0];
    let id = response.info.seed;

    // LIMITS # OF GHOSTIES
    if (app.feed.length === 5) {

        document.getElementById(`${app.feed[0].info.seed}`).remove();
        app.feed.shift();
        app.feed.push(response);

    } else {
        app.feed.push(response);
    }

    // CREATE GHOSTIE HTML
    let child = document.createElement('div');
    child.className = 'ghostie';
    child.id = `${id}`;
    child.setAttribute('data-id',`${id}`);

    // Insert HTML content into the child object.
        child.innerHTML = tmpl.mainFeed(friend, id);

    // APPEND GHOSTIE TO FEED AT RANDOM X AXIS (MARGIN % for RESPONSIVE)
    child.style.marginLeft = `${filter.position()}%`;
    let parent = document.getElementById('feed');
    parent.appendChild(child);
  },

}
