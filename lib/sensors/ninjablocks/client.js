exports.connect = function(url, ninjaSensors, sensors) {

  var socket = require('socket.io-client')(url);

  socket.on('connect', function() {
    console.log('Ninjabridge connected');
  });
  socket.on('disconnect', function() {
    console.log('Ninjabridge disconnected');
  });
  
  socket.on('0_0_11.rfsensor', function(data){
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
