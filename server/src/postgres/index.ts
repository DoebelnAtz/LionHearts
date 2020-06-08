import pg from 'pg';

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

client.connect(function(err: any) {
    if(err) {
        return console.error('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime"', function(err: any, result: any) {
        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].theTime);
        client.end();
    });
});


export const query = (text: string, params: any[]) => {
    return pool.query(text, params)
};

export const connect = () => pool.connect();
