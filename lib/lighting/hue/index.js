var NAME = 'hueLights';
var REQUIRE = ['logger', 'config', 'lights'];

var states = require('./states');
var hub = require('./hub');

function factory(services) {

  var config = services.config;
  var logger = services.logger.getLogger('hue');
  var hubs = {};
  var svc = {};

  config.hue.hubs.forEach(function(h) {
    hubs[h.id] = hub(h);
    svc[h.id] = setLights.bind(this, h.id);
  });

  services.lights.addType('hue', svc);
  svc.setLights = setLights;

  return svc;

  function setLights(hubId, group, value) {
    // api ready?
    if (!hubs[hubId]) return;

    logger.info('Setting hue group:'.green, group, value);
    return hubs[hubId].setGroupLightState(group, states[value]);
  }

}

module.exports = exports = factory;
exports.$name = NAME;
exports.$require = REQUIRE;