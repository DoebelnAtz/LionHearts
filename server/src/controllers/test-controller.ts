import { catchErrors } from '../errors/catchErrors';
import { query } from "../postgres";

export const respondTest = catchErrors(async (req, res) => {
	let resp = await query('SELECT NOW() AS "theTime"', []);
	console.log(resp.rows[0]);
	res.json({message: 'test'})
},'Failed to test');