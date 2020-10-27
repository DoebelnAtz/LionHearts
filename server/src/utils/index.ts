import { query } from '../postgres';
import CustomError from '../errors/customError';

const webPush = require('web-push');

webPush.setVapidDetails(
	'mailto:axel@co-founders.com',
	process.env.PUBLIC_KEY,
	process.env.PRIVATE_KEY,
);

export const sendToAllSubscriptions = async (notification: any) => {
	const subscriptions = await query(`
		SELECT * FROM subscriptions
	`);

	subscriptions.rows.forEach((sub) => {
		webPush
			.sendNotification(
				JSON.parse(sub.subscription),
				JSON.stringify(notification),
			)
			.catch((e: any) => {
				console.log('Expired subscription');
			});
	});
};

export const sendToUser = async (notification: any, userId: number) => {
	const subscriptions = await query(
		`
		SELECT * FROM subscriptions WHERE u_id = $1
	`,
		[userId],
	);

	subscriptions.rows.forEach((sub) => {
		webPush
			.sendNotification(
				JSON.parse(sub.subscription),
				JSON.stringify(notification),
			)
			.catch((e: any) => {
				console.log('Expired subscription');
			});
	});
};
