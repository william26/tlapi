'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

module.exports = function (config) {
  app.get('/', function (req, res) {
    res.status(200).send('HELLO WORLDZ');
  });

  app.listen(3000, function () {
    console.log('Server running on 8080');
  });
};