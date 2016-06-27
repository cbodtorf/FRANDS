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
