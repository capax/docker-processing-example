var q = 'test';

var amqp = require('amqplib');

amqp.connect('amqp://localhost:5672')
  .then((connection) => {
    return connection.createChannel();
  })
  .then((channel) => {
    return channel.assertQueue(q)
      .then((ok) => {
        return channel.consume(q, function(msg) {
          if (msg != null) {
            console.log(msg.content.toString());
            channel.ack(msg);
          }
        });
      })
  })