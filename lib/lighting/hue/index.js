var NAME = 'hueLights';
var REQUIRE = ['logger', 'config', 'lights'];

var states = require('./states');
var hub = require('./hub');
var rateLimit = require('rate-limit');

function factory(services) {

  var config = services.config;
  var logger = services.logger.getLogger('hue');
  var hubs = {};
  var svc = {};
  var queue = rateLimit.createQueue({interval: 100});

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

    // space commands apart
    queue.add(createSetLightsAction(hubs[hubId], group, value));
  }

  function createSetLightsAction(hub, group, value) {
    return function() {
      logger.debug('Setting hue group:', group, value);
      hub.setGroupLightState(group, states[value])
        .then(function() {
          logger.info('Set hue group:'.green, group, value);
        })
        .fail(function() {
          logger.error('Set hue group failed:'.red, group, value);
        });
    };
  }

}

module.exports = exports = factory;
exports.$name = NAME;
exports.$require = REQUIRE;