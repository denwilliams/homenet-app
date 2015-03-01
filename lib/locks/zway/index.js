var NAME = 'zwayLocks';
var REQUIRE = ['locks', 'logger', 'config'];

var controller = require('./controller');

function factory(services) {
  var config = services.config;
  var logger = services.logger.getLogger('zway-lock');
  var controllers = {};
  var svc = {};

  config.zway.controllers.forEach(function(c) {
    controllers[c.id] = controller(c, logger);
    svc[c.id] = setLock.bind(this, c.id);
  });
  svc.setLock = setLock;

  services.locks.addType('zway', svc);

  return svc;

  function setLock(controllerId, lockId, value) {
    logger.info('Setting lock:'.green, lockId, value);
    return controllers[controllerId]
      .setLock(lockId, value);
  }
}

module.exports = exports = factory;
exports.$name = NAME;
exports.$require = REQUIRE;