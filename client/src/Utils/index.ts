export const capitalizeFirst = (string: string) => {
	if (string)
		return string[0].toUpperCase() + string.slice(1);
};

export const getLocal = (item: string) => {
	let unparsedString: string | null;
	try {
		if (item) {
			if (
				(unparsedString = localStorage.getItem(
					item,
				))
			)
				return JSON.parse(unparsedString);
			else return null;
		} else {
			return null;
		}
	} catch (e) {
		return null;
	}
};

export const getLocalTimeFormat = (date: string) => {
	let res = new Date(date);
	return res.toLocaleString('en-FI', {
		hour12: false,
		month: 'long',
		day: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};

export const getLocalDateFormat = (date: string) => {
	let res = new Date(date);
	return res.toLocaleString('en-FI', {
		month: 'long',
		day: '2-digit',
		year: 'numeric',
	});
};

export const checkUser = (uid: number) => {
	try {
		let userId = getLocal('user').user.u_id;
		return uid === userId;
	} catch (e) {
		return false;
	}
};

export const checkAuth = () => {
	try {
		let user: any = '';
		if ((user = getLocal('user'))) {
			switch (user.user.role) {
				case 'superuser':
					return 4;
				case 'admin':
					return 3;
				case 'publisher':
					return 2;
				case 'member':
					return 1;
			}
		} else {
			return false;
		}
	} catch (e) {
		return false;
	}
	return false;
};

export const setLocal = (name: string, jsonItem: any) => {
	localStorage.setItem(name, JSON.stringify(jsonItem));
	return jsonItem;
};

export const calculateTimeSince = (isoString: string) => {
	let then = new Date(isoString);
	let offset = new Date().getTimezoneOffset();
	//
	// @ts-ignore
	var seconds = Math.floor((new Date() - then) / 1000); // convert to seconds..
	var interval = Math.floor(seconds / 31536000);

	let suffix = interval < 0 ? '' : ' ago';
	let prefix = interval < 0 ? 'in ' : '';
	seconds = seconds * (prefix ? -1 : 1);

	if (interval > 1) {
		return (
			prefix +
			interval +
			(interval === 1 ? ' year' : ' years') +
			suffix
		);
	}
	interval = Math.floor(seconds / 2592000);
	if (interval >= 1) {
		return (
			prefix +
			interval +
			(interval === 1 ? ' month' : ' months') +
			suffix
		);
	}
	interval = Math.floor(seconds / 86400);
	if (interval >= 1) {
		return (
			prefix +
			interval +
			(interval === 1 ? ' day' : ' days') +
			suffix
		);
	}
	interval = Math.floor(seconds / 3600);
	if (interval >= 1) {
		return (
			prefix +
			interval +
			(interval === 1 ? ' hour' : ' hours') +
			suffix
		);
	}
	interval = Math.floor(seconds / 60);
	if (interval >= 1) {
		return (
			prefix +
			interval +
			(interval === 1 ? ' minute' : ' minutes') +
			suffix
		);
	}
	return (
		prefix +
		Math.floor(seconds) +
		(Math.floor(seconds) === 1
			? ' second'
			: ' seconds') +
		suffix
	);
};

export const makeId = (length: number) => {
	var result = '';
	var characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength),
		);
	}
	return result;
};
