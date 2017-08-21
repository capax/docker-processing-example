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
    //get the data and dump it out
    return client.query('select * from sample')
      .then((results) => console.dir(results.rows));
  })
  .then(()=> client.end())
  .catch(console.log);
