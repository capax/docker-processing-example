const os = require('os');
const amqp = require('amqplib');

const Client = require('pg')
  .Client;

const config = {
  user: 'ddp',
  password: 'Password123',
  host: 'ddp-pg',
  database: 'sandbox',
  port: 5432
};

const client = new Client(config);

client.connect()
  .then(() => {

    amqp.connect('amqp://ddp-rabbit:5672')
      .then((c) => {
        return connection.createChannel();
      })
      .then((channel) => {
        channel.assertQueue('data-movement')
          .then((ok) => {
            return channel.consume('data-movement', function(msg) {
              var record = JSON.parse(msg.content.toString());
              //on data-movement, check to see if the record exists
              return client.query(`select * from sample where id = ${record.id}`)
                .then((existing) => {
                  if(existing.rows.length > 0){
                    //if so, update
                    return client.query(`update sandbox set stuff = "${record.stuff}" where id = ${record.id}`);
                  }else{
                    //else insert
                    return client.query(`insert into sandbox (stuff) values ("${record.stuff}")`);
                  }
                });
            })
          })
          .then(() => {
            return channel.close();
          });
      })
  });
