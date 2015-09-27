exports.connect = function(url, ninjaSensors, sensors, logger) {

  logger.info('Connecting to bridge ' + b.host);

  var socket = require('socket.io-client')(url);

  socket.on('connect', function() {
    logger.info('Ninjabridge connected');
  });
  socket.on('disconnect', function() {
    logger.info('Ninjabridge disconnected');
  });
  
  socket.on('0_0_11.rfsensor', function(data){
    logger.info('Got RF sensor data ' + JSON.stringify(data));
    var homenetSensorId = ninjaSensors[data.deviceName];
    if (!homenetSensor) return;

    sensors.trigger(homenetSensorId, true);
    //console.log('0_0_11.rfsensor', data);
  });

  // socket.on('event', function(data) {
  //  console.log('event', data);
  // });

  return socket;
};
