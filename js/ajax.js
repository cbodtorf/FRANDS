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
