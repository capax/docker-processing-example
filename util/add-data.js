var mssql = require('mssql');

var connection = {
  user: 'sa',
  password: 'Password123',
  server: 'localhost',
  database: 'sandbox'
};

return Promise.resolve({})
  .then((p) => {
    p.sourcePool = new mssql.ConnectionPool(connection);
    return p.sourcePool.connect()
      .then(() => p);
  })
  .then((p) => {
    //add some data to the table
    var a = new Array(10);
    a.fill(1);
    return Promise.all(a.map((n, ix) => {
        return p.sourcePool.request()
          .query(`insert into dbo.sample (stuff) values ('hello there ${ix}')`);
      }))
      .then(() => p);
  })
  .then((p) => {
    //get data from that table and dump it out
    return p.sourcePool.request()
      .query(`select * from dbo.sample`)
      .then((records) => {
        console.log(`got source records: ${records.recordset.length}`);
        console.dir(records.recordset);
        return p;
      });
  })
  .then((p) => {
    return p.sourcePool.close();
  })
  .catch(console.warn);
