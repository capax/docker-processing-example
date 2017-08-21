const express = require('express');
const os = require('os');
const amqp = require('amqplib');

const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.use(require('body-parser')
  .json());

let connection = null;
let channel = null;
amqp.connect('amqp://ddp-rabbit:5672')
  .then((c) => {
    connection = c;
    return connection.createChannel();
  })
  .then((c) => {
    channel = c;
    channel.assertQueue('data-movement')
      .then((ok) => {
        app.post('/', (req, res) => {
          console.log(`record received: ${JSON.stringify(req.body, null, 3)}`);
          return channel.sendToQueue('data-movement', new Buffer(JSON.stringify(req.body)));
        })
      });
  });

app.listen(PORT, HOST);
console.log(`Running on http://${os.hostname()}:${PORT}`);
