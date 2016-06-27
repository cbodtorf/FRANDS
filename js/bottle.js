/*******************************
* BOTTLE YOUR GHOSTIES FOR FRESHNESS
********************************/
const ajax = require('./ajax');
const tmpl = require('./templates');


module.exports = {

  iChooseYou(url) {
      let feed = document.getElementById('feed');
      let details = document.getElementById('details');

      feed.addEventListener('click', () => {
          let ghostie = event.target.getAttribute('data-id');
          if (ghostie === null) {return}
            else {
              console.log(`${url}?seed=${ghostie}`);
              feed.style.display = 'none';
              details.style.display = 'block';
              ajax.read(capture ,`${url}?seed=${ghostie}`)
            };
      })

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


  }

}
