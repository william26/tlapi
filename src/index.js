import express from 'express';

const app = express();

module.exports = function (config) {
  app.get('/', function (req, res) {
    res.status(200).send('HELLO WORLDZ');
  })

  app.listen(3000, function () {
    console.log('Server running on 8080');
  });
}
