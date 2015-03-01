var IMPLEMENTS = 'server';
var INJECT = ['wsApi', 'webApi', 'nodeRed', 'config'];

function factory(services) {
  var express = require('express');
  var app = express();

  app.use('/', services.webApi);
  services.wsApi.init(app);

  app.listen(services.config.server.port);

  return app;
}

module.exports = exports = factory;
exports.$implements = IMPLEMENTS;
exports.$inject = INJECT;
