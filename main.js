var fs = require('fs');
var config;

var configPaths = [
  __dirname,
  '/etc/homenet',
  '/usr/local/etc/homenet',
  '/private/etc/homenet'
];

configPaths.forEach(function (path) {
  if (fs.existsSync(path + '/config.js')) {
    config = require(path + '/config.js');
  } else if (fs.existsSync(path + '/config.json')) {
    config = require(path + '/config.json');
  }
});

if (!config) {
  throw new Error('Can\'t find a config file');
}

require('homenet-core')
  .start(config)
  .then(function() {
    console.log('Started');
  })
  .fail(function(err) {
    console.error(err.stack);
    process.exit(1);
  });
