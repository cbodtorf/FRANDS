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
