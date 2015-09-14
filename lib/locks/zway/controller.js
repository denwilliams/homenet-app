var zway = require('node-zway');

module.exports = exports = function(config, logger) {
  var id = config.id;
  var host = config.host;
  var port = config.port;

  var deviceApi = new zway.DeviceApi(host);

  return {
    setLock: setLock
  };

  function setLock(id, value) {
    var device = deviceApi.getDevice(id, 98);
    return value ? device['DoorLock'].lock() : device['DoorLock'].unlock();
  }
};