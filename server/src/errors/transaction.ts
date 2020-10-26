import CustomError from './customError';
import { PoolClient } from 'pg';

export const transaction = async (
	transaction: () => Promise<any>,
	client: PoolClient,
	errorMessage: string,
) => {
	try {
		await client.query('BEGIN');
		await transaction();
		await client.query('COMMIT');
	} catch (e) {
		await client.query('ROLLBACK');
		throw new CustomError(errorMessage, 500, e);
	} finally {
		client.release();
	}
};
