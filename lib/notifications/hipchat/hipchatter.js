var HipChat = require('node-hipchat');

function Hipchatter(options, logger) {
  var chat = new HipChat(options.key);

  this.send = send;

  /**
   * Sends a notification
   * @param payload - {alert:Boolean, color:String, title:String, text:String, debug:Bool}
   */
  function send(payload) {
    
    if (typeof payload == 'string') payload = JSON.parse(payload);

    logger.debug('notification', payload);

    var color = payload.color || 'gray';
    if (payload.level) {
      color = levels[payload.level] || 'gray';
    }

    var room = (payload.debug ? options.debugroom || options.room : options.room);

    var chatMsg = {
      room: room,
      from: 'Homenet',
      message: payload.alert ?
        '@all ' + payload.title + ': ' + payload.text :
        '<strong>'+payload.title+'</strong><br />'+payload.text,
      message_format: payload.alert ? 'text' : 'html',
      color: color
    };


    chat.postMessage(chatMsg, function() {
      // logger.info('Sent message', chatMsg);
    });
  }

}

module.exports = exports = Hipchatter;