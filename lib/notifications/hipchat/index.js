var NAME = 'hipchatNotifications';
var REQUIRE = ['notifications', 'config', 'logger'];

var Hipchatter = require('./hipchatter');

function factory(services) {
  var config = services.config;
  if (!config.hipchat) return;

  var notifier = { send: sendToHipchat };
  var logger = services.logger.getLogger('hipchat');
  services.notifications.register(notifier);

  var hipchatter = new Hipchatter(config.hipchat, logger);

  function sendToHipchat(severity, msgTxt, msgHtml) {
    hipchatter.send({title:severity, text: msgHtml || msgTxt});
  }

  return {};
}

module.exports = exports = factory;
exports.$name = NAME;
exports.$require = REQUIRE;
