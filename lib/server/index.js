var IMPLEMENTS = 'server';
var INJECT = ['wsApi', 'webApi', 'nodeRed', 'config', 'logger'];

function factory(services) {
  var express = require('express');
  var app = express();
  var logger = services.logger.getLogger('server');

  app.use('/', services.webApi);
  services.wsApi.init(app);

  var port = services.config.server.port;
  app.listen(port);

  logger.info('Server started on port ' + port);

  return app;
}

module.exports = exports = factory;
exports.$implements = IMPLEMENTS;
exports.$inject = INJECT;
