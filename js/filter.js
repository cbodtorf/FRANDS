/*******************************
* FRIEND FILTERS
********************************/

module.exports = {
  filter() {
    console.log("hey filter time")
  },
  position() {
      let ranPos = () => {
      // let w = (window.innerWidth);
      return Math.floor((Math.random() * 65) + 1);
    };
    return ranPos();
  }
};
