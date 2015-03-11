var NMA = require('notify-my-android');

function NMAClient(options, logger) {
  var nma = new NMA(options.key);

  this.send = send;

  function send(title, text, options) {
    
    try {
      if (payload.alert) {
        nma.notify('Homenet', title, text, options || {}, function(err, remaining) {
          if (err) logger.error(err);
          else logger.debug('NMA messages remaining: ' + remaining.calls);
        });
      }
    } catch(err) {
    }

  }

}

module.exports = exports = NMAClient;
