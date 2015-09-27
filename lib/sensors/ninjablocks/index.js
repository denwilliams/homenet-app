var NAME = 'ninjaRfSensors';
var REQUIRE = ['config', 'presence', 'sensors'];

var controller = require('./controller');
var client = require('./client');

function factory(services) {

  var config = services.config;
  var sensors = services.sensors;
  var logger = services.logger.getLogger('ninjaRfSensors');

  var ninjaConfig = config.ninjaBlocks || {};
  var bridgeConfigs = ninjaConfig.bridges || [];
  var ninjaSensors = ninjaConfig.sensors || {};

  var bridges = {};
  var svc = {};

  bridgeConfigs.forEach(function(b) {
    var url = 'http://' + b.host + ':3006';
    bridges[b.id] = client.connect(url, ninjaSensors, sensors);
      //controller(c, logger, sensors);
  });

  return svc;
}

module.exports = exports = factory;
exports.$name = NAME;
exports.$require = REQUIRE;