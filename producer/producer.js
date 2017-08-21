var mssql = require('mssql');
var request = require('request');

var connection = {
  user: 'sa',
  password: 'Password123',
  server: 'ddp-mssql',
  database: 'sandbox'
};


var CronJob = require('cron')
  .CronJob;

//run every minute
(new CronJob('0 */1 * * * *', function() {
  Promise.resolve({})
    .then((p) => {
      p.sourcePool = new mssql.ConnectionPool(connection);
      return p.sourcePool.connect()
        .then(() => p);
    })
    .then((p) => {
      return p.sourcePool.request()
        //do a blind select splat
        .query(`select * from dbo.sample`)
        .then((records) => {
          console.log(`got source records: ${records.recordset.length}`);
          p.records = records.recordset;
          return p;
        })
        .then((p) => {
          //pump the records up to hap
          Promise.all(p.records.map(record => {
            return new Promise((resolve, reject) => {
              request.post({
                url: 'http://ddp-haproxy',
                json: {
                  table: 'sample',
                  record: record
                }
              }, function(err, response, body) {
                if (err) return reject(err);
                return resolve(body);
              });
            });
          }));
        })
        .then(() => p);
    })
    .then((p) => p.sourcePool.close())
    .catch(console.warn);
})).start();
