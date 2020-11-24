import ReactGA from 'react-ga';
import cookie from 'cookie';

export const initializeGA = () => {
	if (process.env.NODE_ENV === 'production')
		try {
			ReactGA.initialize('UA-183748149-1');
		} catch {
			console.log(
				'failed to initialize google analytics',
			);
		}
	else {
		console.log('GA not initialized');
	}
};

export const pageViewGA = (page: string) => {
	let compliance = cookie.parse(document.cookie)
		.cookieCompliance;
	compliance && ReactGA.pageview(page);
};

export const eventGA = (
	categoryName: string,
	eventName: string,
	label = 'event',
	value = 10,
	nonInteraction = false,
) => {
	let compliance = cookie.parse(document.cookie)
		.cookieCompliance;
	compliance &&
		ReactGA.event({
			category: categoryName, // Required
			action: eventName, // Required
			label: label,
			value: value,
			nonInteraction: nonInteraction,
		});
};

export const exceptionGA = (detail: string) => {
	let compliance = cookie.parse(document.cookie)
		.cookieCompliance;
	compliance &&
		ReactGA.exception({ description: detail });
};

export const timingGA = (
	categoryName: string,
	variableName: string,
	valueNum: number,
) => {
	let compliance = cookie.parse(document.cookie)
		.cookieCompliance;
	compliance &&
		ReactGA.timing({
			category: categoryName,
			variable: variableName,
			value: valueNum,
		});
};
