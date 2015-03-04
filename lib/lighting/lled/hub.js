module.exports = exports = LimitlessHub;

var LLed = require('./')

function LimitlessHub(config, logger) {
  this._connection = {
    connectionDetails: {
      ipAddress: config.host,
      port: 8899
    },
    identifier: config.id
  };
  this._logger = logger;
  this._groups = {};
  this._groupTimers = {};
var globalTimer = null;
  this._queue = [];

}

LimitlessHub.prototype.setLights = function(group, value) {
  var self = this;

  // group can be either a single item or an array

  if (Array.isArray(group)) {
    group.forEach(function(g) {
      self.setLights(g, value);
    });
    return;
  }

  self._logger.info('Setting light group :' + group + ' to ' + value);

  var groups = this._groups;
  
  if (!groups[group]) {
    groups[group] = self._getLledGroup(group);
  }
  var light = groups[group];
  self._setLledLights(light, value, group);

};


LimitlessHub.prototype._getLightGroup = function(groupNum) {

  var group = {
    colorType: 'rgbw',
    number: groupNum
  };

  return new LLed(this._connection, group);

};

LimitlessHub.prototype._setLightGroup = function(light, val) {

  var commands = [].concat(states[val]);

  // console.info('Running commands for group ' + group, commands);
  if (groupTimers[group]) {
    clearTimeout(groupTimers[group]);
  }
  nextCommand();

  // TODO: make sure 2 commands can't run at same time for a group

  function nextCommand() {
    if (commands.length === 0) {
      // console.warn('No more commands in ' + val);
      return;
    }
    processCommand(commands.shift(), light);
    nextCommand();
    // var command = commands.shift();
    // if (command.method === 'delay') {
    //  groupTimers[group] = setTimeout(function() {
    //    nextCommand();
    //  }, command.value);
    // } else {
    //  light[command.method](command.value, function() {
    //    console.log('.');
    //    nextCommand();
    //  });
    // }
  }
};


LimitlessHub.prototype._processCommand = function(command, light) {
  // add it to the queue to make sure the hub doesn't git hit by multiple commands
  // ... do it 10 times because they're a bit shit
  this._queue.push({command:command, light:light});
  this._queue.push({command:command, light:light});
  this._queue.push({command:command, light:light});
  this._queue.push({command:command, light:light});
  this._queue.push({command:command, light:light});
  this._queue.push({command:command, light:light});
  this._queue.push({command:command, light:light});
  this._queue.push({command:command, light:light});
  this._queue.push({command:command, light:light});
  this._queue.push({command:command, light:light});

  if (!this._globalTimer) {
    this._globalTimer = setTimeout(function() {
      next();
    },1);
  }
};


LimitlessHub.prototype._next = function() {

  var self = this;

  if (self._queue.length === 0) {
    console.log('No more commands in global queue');
    self._globalTimer = null;
    return;
  }

  var item = self._queue.shift();
  var command = item.command;
  var light = item.light;

  // globalTimer = setTimeout(function() {

  if (command.method === 'delay') {
    self._globalTimer = setTimeout(function() {
      self._next();
    }, command.value);
  } else {
    // console.info('Running LLED command', command.value);
    light[command.method](command.value, function() {
      // globalTimer = setTimeout(function() {
      self._next();
      // },1);
    });
  }

};