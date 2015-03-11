var NAME = 'limitlessLights';
var REQUIRE = ['logger', 'config', 'lights'];

var Hub = require('./hub');

function factory(services) {

  var config = services.config;
  var logger = services.logger.getLogger('limitless');
  var hubs = {};
  var svc = {};

  if (!config.limitless || !config.limitless.hubs) return;

  config.limitless.hubs.forEach(function(h) {
    var hub = new Hub(h);
    hubs[h.id] = hub;
    svc[h.id] = hub.setLights.bind(hub);
  });
  svc.setLights = setLights;

  services.lights.addType('limitless', svc);

  return svc;

  function setLights(hubId, group, value) {
    if (!hubs[hubId]) return;

    logger.info('Setting limitless group:'.green, group, value);
    return hubs[hubId].setLights(group, states[value]);
  }

}

module.exports = exports = factory;
exports.$name = NAME;
exports.$require = REQUIRE;