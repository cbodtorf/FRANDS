(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*******************************
* AJAX REQUESTS
********************************/

module.exports = {

  read(func, url) {

    let request = new XMLHttpRequest();

    //*** for some reason I'm getting a  JSON PARSE ERROR w/ ARROW FUNCTION HERE ***
    request.addEventListener('load', function() {

      let friend = JSON.parse(this.responseText);
      func(friend);

    });

    request.open('GET', url);
    request.send();
  },


  create(func) {

    let request = new XMLHttpRequest();
    request.addEventListener('load', func );

    request.open('POST', app.savedUrl);
    request.send();
  },


  update(func, url, id) {

    let request = new XMLHttpRequest();
    let updateUrl = url + '/' + id;
    request.addEventListener('load', func );

    request.open('PUT', updateUrl);
    request.send();
  },


  delete(func, url, id) {

    let request = new XMLHttpRequest();
    let deleteUrl = url + '/' + id;
    request.addEventListener('load', func );

    request.open('DELETE', deleteUrl);
    request.send();
  }


}

},{}],2:[function(require,module,exports){
/*******************************
* BOTTLE YOUR GHOSTIES FOR FRESHNESS
********************************/
const ajax = require('./ajax');
const tmpl = require('./templates');

let feed = document.getElementById('feed');
let details = document.getElementById('details');
let back = document.getElementById('back');
let add = document.getElementById('add');
let bottle = document.getElementById('bottle');


module.exports = {

  iChooseYou(url) {

      feed.addEventListener('click', () => {
          let ghostie = event.target.getAttribute('data-id');
          if (ghostie === null) {return}
            else {
              feed.style.display = 'none';
              details.style.display = 'block';
              back.style.display = 'inline-block';
              add.style.display = 'inline-block';
              ajax.read(capture ,`${url}?seed=${ghostie}`);
            };
      })

      /*******************************
      * CREATE/PLACE GHOST IN BOTTLE
      ********************************/

      let capture  = (response) => {
          let friend = response.results[0];
          let id = response.info.seed;

          // CREATE GHOSTIE HTML
          let child = document.createElement('div');
          child.className = 'ghostie caught';
          child.id = `${id}`;
          child.setAttribute('data-id',`${id}`);

          // Insert HTML content into the child object.
          child.innerHTML = tmpl.mainFeed(friend, id);

          let parent = document.getElementById('bottle');
          parent.appendChild(child);
      }


  },

  back() {
      back.addEventListener('click', () => {
          details.style.display = "none";
          back.style.display = "none";
          add.style.display = "none";
          bottle.innerHTML = "";
          feed.style.display = "block";
    })
  }

}

},{"./ajax":1,"./templates":5}],3:[function(require,module,exports){
'use strict';

// Created by Caleb Bodtorf
// Date 6/24/2016

/*******************************
* MODULES
********************************/

// const _ = require('../node_modules/underscore/underscore');
var filter = require('./filter');
var tmpl = require('./templates');
// ajax.read(func, url)
// ajax.create(func)
// ajax.update(func, url, id)
// ajax.delete(func, url, id)
var ajax = require('./ajax');
var bottle = require('./bottle');

/*******************************
* ON READY: LOAD APP
********************************/

window.addEventListener('load', function () {
  console.log('page has loaded');
  app.init();
  setInterval(function () {
    ajax.read(app.getFriend, app.randoUrl);
  }, 2000);
});

var app = {
  randoUrl: 'https://randomuser.me/api/',
  savedUrl: 'http://tiny-tiny.herokuapp.com/collections/ghostfrand',
  feed: [],
  friends: [],

  init: function init() {
    app.events();
    app.styles();
  },
  styles: function styles() {},


  /*******************************
  * EVENTS
  ********************************/

  events: function events() {

    // header/nav clicks
    var menu = document.getElementById("menu");
    menu.addEventListener('click', function () {
      menu.parentNode.style.transform = "translateY(-260px)";
    });

    var home = document.getElementById("home");
    home.addEventListener('click', function () {
      menu.parentNode.style.transform = "translateY(0)";
    });

    // click ghost to capture
    bottle.iChooseYou(app.randoUrl);
    // back to ghost feed
    bottle.back();
  },


  /*******************************
  * POPULATE MAIN FEED
  ********************************/

  getFriend: function getFriend(response) {
    var friend = response.results[0];
    var id = response.info.seed;

    // LIMITS # OF GHOSTIES
    if (app.feed.length === 5) {

      document.getElementById('' + app.feed[0].info.seed).remove();
      app.feed.shift();
      app.feed.push(response);
    } else {
      app.feed.push(response);
    }

    // CREATE GHOSTIE HTML
    var child = document.createElement('div');
    child.className = 'ghostie';
    child.id = '' + id;
    child.setAttribute('data-id', '' + id);

    // Insert HTML content into the child object.
    child.innerHTML = tmpl.mainFeed(friend, id);

    // APPEND GHOSTIE TO FEED AT RANDOM X AXIS (MARGIN % for RESPONSIVE)
    child.style.marginLeft = filter.position() + '%';
    var parent = document.getElementById('feed');
    parent.appendChild(child);
  }
};
},{"./ajax":1,"./bottle":2,"./filter":4,"./templates":5}],4:[function(require,module,exports){
/*******************************
* FRIEND FILTERS
********************************/

module.exports = {
  filter() {
    console.log("hey filter time")
  },
  position() {
      let ranPos = () => {
      // let w = (window.innerWidth);
      return Math.floor((Math.random() * 65) + 1);
    };
    return ranPos();
  }
};

},{}],5:[function(require,module,exports){
/*******************************
* <!--TEMPLATES -->
********************************/


module.exports = {
  friendList: `
      <li class="side--friend">
        <img src=" <%= image %> " alt="" />
        <span><%= name %></span>
      </li>
  `,
  mainFeed(friend, id) {
    return `
        <img src='${friend.picture.medium}' data-id='${id}' />
        <p data-id='${id}'>The Ghost of <br>
        <b> ${friend.name.first}</b>
        <br> Says hi.</p>
    `
  }
}

},{}]},{},[3])