require('babel-polyfill');

const config = require('./dist/config');
require('./dist')(config);
