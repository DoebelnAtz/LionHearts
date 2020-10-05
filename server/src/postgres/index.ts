import pg from 'pg';

console.log(process.env);
const dbConfig = {
	user: process.env.DB_USER,
	host: process.env.DB_ADDR,
	database: process.env.DB_NAME,
	password: process.env.DB_PASS,
};

const pool = new pg.Pool(dbConfig);

const client = new pg.Client(dbConfig);

client.connect(function (err: any) {
	if (err) {
		return console.error('could not connect to postgres', err);
	}
	client.query('SELECT NOW() AS "theTime"', function (err: any, result: any) {
		if (err) {
			return console.error('error running query', err);
		}
		console.log(result.rows[0].theTime);
		client.end();
	});
});

export const query = (text: string, params?: any[]) => {
	return pool.query(text, params);
};

export const connect = () => pool.connect();
