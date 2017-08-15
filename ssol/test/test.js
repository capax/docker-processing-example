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
    //drop the table if it exists
    return p.sourcePool.request()
      .query('drop table if exists dbo.sample')
      .then(() => p);
  })
  .then((p) => {
    //create a table
    return p.sourcePool.request()
      .query('create table dbo.sample (id int not null identity(1,1) primary key, stuff nvarchar(4000))')
      .then(() => p);
  })
  .then((p) => {
    //add some data to that table
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
  .catch(console.warn);
