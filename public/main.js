(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*******************************
* AJAX REQUESTS
********************************/

module.exports = {

  read: function(func, url) {
    // call app.read(func, url);
    let request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      let friend = JSON.parse(this.responseText);
      func(friend);
    } );
    request.open('GET', url);
    request.send();
  },


  create: function(func) {
    // call app.create(func);
    let request = new XMLHttpRequest();
    request.addEventListener('load', func );
    request.open('POST', app.savedUrl);
    request.send();
  },


  update: function(func, url, id) {
    // call app.update(func, url, id);
    let request = new XMLHttpRequest();
    let updateUrl = url + '/' + id;
    request.addEventListener('load', func );
    request.open('PUT', updateUrl);
    request.send();
  },


  delete: function(func, url, id) {
    // call app.delete(func, url, id);
    let request = new XMLHttpRequest();
    let deleteUrl = url + '/' + id;
    request.addEventListener('load', func );
    request.open('DELETE', deleteUrl);
    request.send();
  }


}

},{}],2:[function(require,module,exports){
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

},{"./ajax":1,"./filter":3,"./templates":4}],3:[function(require,module,exports){
/*******************************
* FRIEND FILTERS
********************************/

module.exports = {
  filter: function () {
    console.log("hey filter time")
  }
  
};

},{}],4:[function(require,module,exports){
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
  mainFeed: `
      <div class="main--friend">
        <img src=" <%= image %> " alt="" />
        <span><%= name %></span>
      </div>
  `,
}

},{}]},{},[2])