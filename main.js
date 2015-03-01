var config = require('./config');

require('homenet-core')
  .start(config)
  .then(function() {
    console.log('Started');
  })
  .fail(function(err) {
    console.error(err.stack);
    process.exit(1);
  });
