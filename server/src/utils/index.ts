import { query } from '../postgres';

const webPush = require('web-push');

webPush.setVapidDetails(
	'mailto:axel@co-founders.com',
	process.env.PUBLIC_KEY,
	process.env.PRIVATE_KEY,
);

export const sendToAllSubscriptions = async (
	notification: any,
	excludedId?: number,
) => {
	const subscriptions = await query(`
		SELECT * FROM subscriptions
	`);

	subscriptions.rows.forEach((sub) => {
		let subscription = JSON.parse(sub.subscription);
		if (excludedId && excludedId === sub.u_id) {
			return;
		} else {
			webPush
				.sendNotification(subscription, JSON.stringify(notification))
				.catch((e: any) => {
					console.log('Expired subscription');
				});
		}
	});
};

export const sendToUser = async (
	notification: any,
	userId: number,
	excludedId?: number,
) => {
	const subscriptions = await query(
		`
		SELECT * FROM subscriptions WHERE u_id = $1
	`,
		[userId],
	);

	subscriptions.rows.forEach((sub) => {
		let subscription = JSON.parse(sub.subscription);
		if (excludedId && excludedId === sub.u_id) {
			return;
		} else {
			webPush
				.sendNotification(subscription, JSON.stringify(notification))
				.catch((e: any) => {
					console.log('Expired subscription');
				});
		}
	});
};
