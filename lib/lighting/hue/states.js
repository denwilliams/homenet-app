var hue = require('node-hue-api');

module.exports = exports = {

  'bright': hue.lightState.create().on().white(250, 100).effect('none'),
  'full': hue.lightState.create().on().white(500, 100).effect('none'),
  'high': hue.lightState.create().on().white(500, 75).effect('none'),
  'medium': hue.lightState.create().on().white(500, 50).effect('none'),
  'med': hue.lightState.create().on().white(500, 50).effect('none'),
  'low': hue.lightState.create().on().white(500, 25).effect('none'),
  'minimum': hue.lightState.create().on().white(500, 1).effect('none'),
  'min': hue.lightState.create().on().white(500, 1).effect('none'),
  'off': hue.lightState.create().off(),

  'fadelow': hue.lightState.create().on().white(500, 25).effect('none').transition(5),
  'fadeoff': hue.lightState.create().off().transition(20),

  'movie': hue.lightState.create().on().hsl(350, 100, 20).effect('none').transition(3),
  'redalert': hue.lightState.create().hsl(0, 100, 100).on(),
  'greenalert': hue.lightState.create().hsl(145, 100, 100).on(),
  'bluealert': hue.lightState.create().hsl(250, 100, 100).on(),
  'purplealert': hue.lightState.create().hsl(280, 100, 100).on(),

  'party': hue.lightState.create().on().hsl(0, 100, 100).effect('colorloop'),

  'test': hue.lightState.create().on().hsl(300, 100, 60).effect('none').transition(5),
  'test2': hue.lightState.create().alert().white(500, 10)

};
