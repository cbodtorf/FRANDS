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
  }, 5000);
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

  },
  getFriend: function (response) {
    let friend = response.results[0];
    let id = response.info.seed;

    if (app.friends.length === 5) {
        let idToDelete = app.friends[0].info.seed;
        document.getElementById(`${idToDelete}`).remove();
        app.friends.shift();
        app.friends.push(response);
    } else {
        app.friends.push(response);
    }
    console.log(app.friends);
    console.log(app.friends[app.friends.length -1]);


    let child = document.createElement('div');
    child.className = 'ghostie';
    child.id = `${id}`;

    // Insert HTML content into the child object.
        child.innerHTML = `
            <img src='${friend.picture.medium}' />
            <p>The Ghost of <br><b>${friend.name.first}</b><br> Says hi.</p>
        `;
    child.style.marginLeft = `${app.position()}%`;
    let parent = document.getElementById('main-window');
    parent.appendChild(child);
  },
  position: function () {
      let ranPos = function () {
      // let w = (window.innerWidth);
      return Math.floor((Math.random() * 65) + 1);
    };
    return ranPos();
  }
}
