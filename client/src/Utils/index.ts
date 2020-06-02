export const capitalizeFirst = (string: string) => {
	if (string) return string[0].toUpperCase() + string.slice(1);
};

export const getLocal = (item: string) => {
    if (item) {
        return JSON.parse(localStorage.getItem(item) || '');
    } else {
        return null;
    }
};

export const setLocal = (name: string, jsonItem: { items: any }) => {
	localStorage.setItem(name, JSON.stringify(jsonItem));
};

export const calculateTimeSince = (isoString: string) => {
	let then = new Date(isoString);
	// @ts-ignore
    var seconds = Math.floor((new Date() - then) / 1000); // remove two hours for timezone...

	var interval = Math.floor(seconds / 31536000);

	if (interval > 1) {
		return interval + (interval === 1 ? ' year' : ' years') + ' ago';
	}
	interval = Math.floor(seconds / 2592000);
	if (interval >= 1) {
		return interval + (interval === 1 ? ' month' : 'months') + ' ago';
	}
	interval = Math.floor(seconds / 86400);
	if (interval >= 1) {
		return interval + (interval === 1 ? ' day' : ' days') + ' ago';
	}
	interval = Math.floor(seconds / 3600);
	if (interval >= 1) {
		return interval + (interval === 1 ? ' hour' : ' hours') + ' ago';
	}
	interval = Math.floor(seconds / 60);
	if (interval >= 1) {
		return interval + (interval === 1 ? ' minute' : ' minutes') + ' ago';
	}
	return (
		Math.floor(seconds) +
		(Math.floor(seconds) === 1 ? ' second' : ' seconds') +
		' ago'
	);
};