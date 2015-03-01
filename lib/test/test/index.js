module.exports = exports = function (services) {
  console.log('logger');
};
exports.$name = 'testPlugin';
exports.$require = ['logger'];
