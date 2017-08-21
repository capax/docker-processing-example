const Client = require('pg')
  .Client;

const config = {
  user: 'ddp',
  password: 'Password123',
  host: 'localhost',
  database: 'sandbox',
  port: 5432
};

const client = new Client(config);

client.connect()
  .then(() => {
    //drop the table if it exists
    return client.query('drop table if exists sample')
      .then(() => console.log('table dropped (maybe)'))
  })
  .then(() => {
    return client.query(`create table sample (id serial primary key, stuff varchar(4000))`)
      .then(() => console.log('table created'));
  })
  .then(() => {
    //add some data to that table
    var a = new Array(10);
    a.fill(1);
    return Promise.all(a.map((n, ix) => {
      return client.query(`insert into sample (stuff) values ('hello there ${ix}')`);
    }))
      .then(()=> console.log('data inserted'));
  })
  .then(() => {
    //get the data and dump it out
    return client.query('select * from sample')
      .then((results) => console.dir(results.rows));
  })
  .then(()=> client.end())
  .catch(console.log);
