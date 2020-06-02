const pg = require('pg');

const dbConfig = {
    user: 'postgres',
    host: '0.0.0.0',
    database: 'test',
    password: process.env.db || 'password'
};

const pool = new pg.Pool (
    dbConfig
);

const client = new pg.Client (
    dbConfig
);

client.connect(function(err) {
    if(err) {
        return console.error('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime"', function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].theTime);
        // >> output: 2018-08-23T14:02:57.117Z
        client.end();
    });
});

module.exports = {
    query: (text, params) => {
        return pool.query(text, params)
    },
    connect: () => pool.connect(),
};