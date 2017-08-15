var q = 'test';

var amqp = require('amqplib');

var connection = null;

amqp.connect('amqp://localhost:5672')
  .then((c) =>{
    connection = c;
    return connection.createChannel();
  })
  .then((channel) => {
    return channel.assertQueue(q)
      .then((ok) => {
        return channel.sendToQueue(q, new Buffer('hello world!'));
      })
      .then(()=>{
        return channel.close();
      })
  })
  .then(() =>{
    connection.close();
  });
