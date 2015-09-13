var http = require('http');
var MAX_RETRIES = 5;

module.exports = exports = function(config, logger) {
  var id = config.id;
  var host = config.host;
  var port = config.port;

  return {
    setLock: setLock
  };

  function setLock(id, value, retryCount) {
    value = value ? 255 : 0;
    var url = 'http://'+host+':'+port+'/ZWaveAPI/Run/devices['+id+'].instances[0].commandClasses[0x62].Set('+value+')';
    logger.debug(url);
    http.get(url, function(res) {
      logger.info("Got response: " + res.statusCode);
      // notifications.send({title:'Lock'+device, text:''+value, color:'purple'});
    })
    .on('error', function(e) {
      logger.error("ZWay error: " + e.message + ' (' + url + ')');
      retrySetLock(id, value, retryCount || 1);
      // notifications.send({title:'Lock'+device, text:'Error: ' + e.message, color:'green'});
    });
  }

  function retrySetLock(id, value, retryCount) {
    if (retryCount > MAX_RETRIES) return;
    setLock(id, value, retryCount++);
  }
};