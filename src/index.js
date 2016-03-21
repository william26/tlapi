import express from 'express';

const app = express();

import daFactory from './da';

import bodyParser from 'body-parser';
import cors from 'cors';


module.exports = function (config) {
  app.use(cors({
    origin: function(origin, callback){
      callback(null, true);
    }
  }));

  app.use(bodyParser.json());
  const startTime = new Date();

  const da = daFactory(config);

  app.get('/', function (req, res) {
    res.status(200).send({
      start: startTime
    });
  })

  app.post('/todos', async function (req, res) {
    try {
      const result = await da.insert('todo', {
        ...req.body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setTimeout(() => res.status(200).send(result), 500)

    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'unknown error'
      });
    }
  });

  app.delete('/todos/:id', async function (req, res) {
    try {
      await da.delete('todo', req.params.id);
      setTimeout(() => res.status(200).send({ status: 'success' }), 500)
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'unknown error'
      });
    }
  });

  app.get('/todos', async function (req, res) {
    try {
      const result = await da.select('todo');
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'unknown error'
      });
    }
  });

  app.listen(3000, function () {
    console.log('Server running on 8080');
  });
}
