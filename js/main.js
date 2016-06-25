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


/*******************************
* ON READY: LOAD APP
********************************/

window.addEventListener('load', function () {
  console.log('page has loaded');
  app.init();
  setInterval(function () {
    ajax.read(app.getFriend, app.randoUrl);
  }, 2000);
})

const app = {
  randoUrl: 'https://randomuser.me/api/',
  savedUrl: 'http://tiny-tiny.herokuapp.com/collections/ghostfrand',
  friends: [],
  init: function () {
    app.events();
    app.styles();
  },
  styles: function () {

  },
  events: function() {
    let menu = document.getElementById("menu");
    menu.addEventListener('click', function(){
      menu.parentNode.style.transform = "translateY(-260px)";
    })

    let home = document.getElementById("home");
    home.addEventListener('click', function(){
      menu.parentNode.style.transform = "translateY(0)";
    })

  },
  getFriend: function (response) {
    let friend = response.results[0];
    let id = response.info.seed;

    if (app.friends.length === 5) {

        document.getElementById(`${app.friends[0].info.seed}`).remove();
        app.friends.shift();
        app.friends.push(response);

    } else {

        app.friends.push(response);
    }

    // CREATE GHOSTIE HTML
    let child = document.createElement('div');
    child.className = 'ghostie';
    child.id = `${id}`;

    // Insert HTML content into the child object.
        child.innerHTML = `
            <img src='${friend.picture.medium}' />
            <p>The Ghost of <br><b>${friend.name.first}</b><br> Says hi.</p>
        `;

    // APPEND GHOSTIE TO FEED AT RANDOM X AXIS (MARGIN % for RESPONSIVE)
    child.style.marginLeft = `${filter.position()}%`;
    let parent = document.getElementById('views');
    parent.appendChild(child);
  }
}
