/*******************************
* AJAX REQUESTS
********************************/

module.exports = {

  read: (func, url) => {
    // call app.read(func, url);
    app.request.addEventListener('load', func );
    app.request.open('READ', url);
    app.requeset.send();
  },


  create: (func) => {
    // call app.create(func);
    app.request.addEventListener('load', func );
    app.request.open('POST', app.savedUrl);
    app.request.send();
  },


  update: (func, url, id) => {
    // call app.update(func, url, id);
    let updateUrl = url + '/' + id;
    app.request.addEventListener('load', func );
    app.request.open('PUT', updateUrl);
    app.request.send();
  },


  delete: (func, url, id) => {
    // call app.delete(func, url, id);
    let deleteUrl = url + '/' + id;
    app.request.addEventListener('load', func );
    app.request.open('DELETE', deleteUrl);
    app.request.send();
  }


}
