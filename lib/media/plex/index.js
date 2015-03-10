var NAME = 'plexMedia';
var REQUIRE = ['media', 'logger', 'config'];

var Device = require('./device');
var EventEmitter = require('events').EventEmitter;

function factory (services) {

  var logger = services.logger.getLogger('media-plex');
  var config = services.config;
  var devices = {};

  var service = new EventEmitter();
  service.getPlaylists = function() {};
  service.playPlaylist = function() {};

  config.media.devices
  .filter(function(config) { return config.type === 'plex'; })
  .forEach(function(config) {

    var id = config.id;
    var name = config.name || config.id;

    var opts = {
      id: id,
      name: name,
      host: config.host,
      port: config.port || 3005,
      path: config.path || '/player/timeline/poll?wait=1&commandID=4',
      clientId: config.clientId,
      logger: logger
    };

    var d = new Device(opts);
    
    d.on('activePlayer', function(activePlayer) {
      // console.log('active',id,activePlayer);
      service.emit('stateChanged', {id:id, name:name, activePlayer:activePlayer});
    });

    devices[config.id] = d;

  });
  return service;
}

module.exports = exports = factory;
exports.$name = NAME;
exports.$require = REQUIRE;