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
const ajax = require('./ajax')


/*******************************
* ON READY: LOAD APP
********************************/

window.addEventListener('load', => {
  console.log('page has loaded');
  app.init();
  // setInterval(getFriend, 5000);
})

const app = {
  request: XMLHttpRequest(),
  randoUrl: 'https://randomuser.me/api/',
  savedUrl: 'http://tiny-tiny.herokuapp.com/collections/ghostfrand',
  init: => {
    app.events();
    app.styles();
  },
  styles: => {

  },
  events: => {

  },
}
