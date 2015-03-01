var hue = require('node-hue-api');
var HueApi = hue.HueApi;

module.exports = exports = connectHub;

function connectHub(config) {

  var hub = new HueApi(config.host, config.key);

  return hub;

  // no longer required:
  // return hub.connect()
  // .fail(function(err) {
  //   // retry
  //   setTimeout(function() { connectHub(config); }, 5000);
  // })
  // .then(function () {
  //   return hub;
  // });

}
