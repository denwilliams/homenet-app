var NAME = 'nmaNotifications';
var REQUIRE = ['notifications', 'config', 'logger'];

var NMAClient = require('./nma-client');

function factory(services) {
  var config = services.config;
  if (!config.nma) return;

  var logger = services.logger.getLogger('nma');
  services.notifications.register(sendToNMA);

  var nmaClient = new NMAClient(config.nma, logger);

  function sendToNMA(severity, msgTxt, msgHtml) {
    nmaClient.send(severity, msgHtml || msgTxt);
  }

  return {};
}

module.exports = exports = factory;
exports.$name = NAME;
exports.$require = REQUIRE;
