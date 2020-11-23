import ReactGA from 'react-ga';

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
	ReactGA.pageview(page);
};

export const eventGA = (
	categoryName: string,
	eventName: string,
	label = 'event',
	value = 10,
	nonInteraction = false,
) => {
	ReactGA.event({
		category: categoryName, // Required
		action: eventName, // Required
		label: label,
		value: value,
		nonInteraction: nonInteraction,
	});
};

export const exceptionGA = (detail: string) => {
	ReactGA.exception({ description: detail });
};

export const timingGA = (
	categoryName: string,
	variableName: string,
	valueNum: number,
) => {
	ReactGA.timing({
		category: categoryName,
		variable: variableName,
		value: valueNum,
	});
};
