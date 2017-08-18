const express = require('express');
const os = require('os');
const amqp = require('amqplib');

const PORT = 8080;
const HOST = '0.0.0.0';



const app = express();
app.post('/', (req, res) => {
  let connection = null;
  amqp.connect('amqp://ddp-rasbbit:5672')
    .then((c) => {
      connection = c;
      return connection.createChannel();
    })
    .then((channel) => {
      channel.assertQueue('data-movement')
        .then((ok) => {
          return channel.sendToQueue('data-movement', new Buffer(JSON.stringify(req.body)));
        })
        .then(()=>{
          return channel.close();
        });
    })
    .then(() => {
      connection.close();
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${os.hostname()}:${PORT}`);
