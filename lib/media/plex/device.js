var EventEmitter = require('events').EventEmitter;
var http = require('http');
var parseString = require('xml2js').parseString;
// var domain = require('domain');

module.exports = exports = Device;

function Device(config) {
  var logger = config.logger;
  var requesting = false;
  var evt = new EventEmitter();

  // var url = 'http://'+config.host+':'+config.port+config.path;

  var states = {
    'music': false,
    'video': false,
    'photo': false
  };

  this.on = evt.on.bind(evt);
  this.removeListener = evt.removeListener.bind(evt);

  logger.info('Starting Plex monitor');

  var reqOpt = {
    hostname: config.host,
    port: config.port,
    path: config.path,
    method: 'GET',
    headers: {
      'X-Plex-Client-Identifier': config.clientId
    }
  };

  init();

  function init() {
    setInterval(makeRequest, 500);
  }

  function makeRequest() {
    // don't request while outstanding
    if (requesting) return;

    // console.log('REQUESTING: ' + url);

    requesting = true;

    var req = http.request(reqOpt, handleResponse);
    req.on('error', requestError);
    req.end();

    function requestError(err) {
      requesting = false;
      logger.error('Problem with request: ' + err.message);
    }

    function handleResponse(res) {
      requesting = false;

      res.setEncoding('utf8');
      res.on('error', responseError);
      res.on('data', processChunk);

      function processChunk(chunk) {
        var changed = false;

        parseString(chunk, function (err, result) {
          
          if (err) {
            logger.error(err);
            return;
          }

          if (!result.MediaContainer || !result.MediaContainer.Timeline) {
            logger.warn('Unexpected response:', result);
            return;
          }

          result.MediaContainer.Timeline.forEach(function(player) {
            changed = setState(player.$.type, player.$.state) || changed;
          });

          if (changed) setActive();

        });
      }

      function responseError(err) {
        requesting = false;
        logger.error('Problem with response: ' + err.message);
      }
    }

  }

  function setActive() {
    var active = null;
    if (states.photo == 'playing') active = 'photo';
    if (states.music == 'playing') active = 'music';
    if (states.video == 'playing') active = 'video';
    logger.debug('Active player changed now ' + active);
    evt.emit('activePlayer', active);
  }

  function setState(player, state) {
    var oldState = states[player];
    if (state && oldState != state) {
      logger.debug('State changed for ' + player + ' to ' + state);
      states[player] = state;
      evt.emit(player, {state:state, oldState:oldState});
      return true;
    }
    return false;
  }

}

