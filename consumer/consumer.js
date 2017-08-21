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

console.log('\n\n ## starting consumer ## \n\n');

const client = new Client(config);

client.connect()
  .then(() => {

    amqp.connect('amqp://ddp-rabbit:5672')
      .then((c) => {
        return c.createChannel();
      })
      .then((channel) => {
        channel.assertQueue('data-movement')
          .then((ok) => {
            return channel.consume('data-movement', function(msg) {
              var parsed = JSON.parse(msg.content.toString());
              console.log(`received msg for ${parsed.record.id}`);
              //on data-movement, check to see if the record exists
              return client.query(`select * from ${parsed.table} where id = ${parsed.record.id}`)
                .then((existing) => {
                  var columns = Object.keys(parsed.record);

                  if (existing.rows.length > 0) {
                    //if so, update
                    var update = columns.map(c => `${c} = '${parsed.record[c]}'`)
                      .join(',');
                    return client.query(`update ${parsed.table} set ${update} where id = ${parsed.record.id}`);
                  } else {
                    //else insert
                    var temp = `insert into ${parsed.table} (${columns.join(',')}) values (${columns.map(c=>"'"+parsed.record[c]+"'").join(',')})`;
                    console.log(temp);
                    return client.query(temp);
                  }
                })
                .then(() => channel.ack(msg));
            })
          })
      })
      .catch(console.warn)
  });
