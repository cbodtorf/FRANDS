/*******************************
* FRIEND FILTERS
********************************/

module.exports = {
  filter: function () {
    console.log("hey filter time")
  },
  position: function () {
      let ranPos = function () {
      // let w = (window.innerWidth);
      return Math.floor((Math.random() * 65) + 1);
    };
    return ranPos();
  }  
};
