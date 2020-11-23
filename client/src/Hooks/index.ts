import React, {
	createRef,
	RefObject,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { makeRequest } from '../Api';
import { WidthContext } from '../Context/WidthContext';
import { useHistory } from 'react-router';
import { useLayoutEffect } from 'react';
import { CurrentNavContext } from '../Context/CurrentNavContext';
import { getLocal, setLocal } from '../Utils';
import { AuthContext } from '../Context/AuthContext';
import { QueryOptions } from '../@types';
import { timingGA } from '../Utils/GoogleAnalytics';
import { throttle } from 'lodash';

export const useNav = (current: string) => {
	const { update } = useContext(CurrentNavContext);
	useEffect(() => {
		update(current);
	}, [current]);
};

export const useIsomorphicLayoutEffect =
	typeof window !== 'undefined'
		? useLayoutEffect
		: useEffect;
// custom hook for easy modal dismissal
export const useDismiss = (
	refInside: RefObject<HTMLDivElement | null>,
	close: () => void,
	exclude?: RefObject<HTMLElement | null>,
) => {
	const handleEsc = (e: KeyboardEvent) => {
		if (e.key !== 'Escape') return;
		else {
			e.preventDefault();
			// esc by default stops the page from refreshing,
			// this is not a problem but causes a small delay when pressing.
			close();
		}
	};
	const handleClick = (e: MouseEvent) => {
		let target = e.target as HTMLDivElement;
		if (
			refInside?.current?.contains(target) ||
			exclude?.current?.contains(target)
		)
			return;
		else close();
	};
	useEffect(() => {
		document.addEventListener('keydown', handleEsc);
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener(
				'keydown',
				handleEsc,
			);
			document.removeEventListener(
				'mousedown',
				handleClick,
			);
		};
	}, []);
};

// A hook that helps with checking if a component is mounted,
// used to check if a component is still mounted before updating a state
export const useMounted = () => {
	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);
	return isMounted;
};

// Hook that checks if returned ref is visible (credit: https://stackoverflow.com/a/61719846)
export default function useVisibility<
	Element extends HTMLElement
>(
	offset = 0,
	throttleMilliseconds = 100,
): [Boolean, React.RefObject<Element>] {
	const [isVisible, setIsVisible] = useState(false);
	const currentElement = createRef<Element>();

	const onScroll = throttle(() => {
		if (!currentElement.current) {
			setIsVisible(false);
			return;
		}
		const top = currentElement.current.getBoundingClientRect()
			.top;
		setIsVisible(
			top + offset >= 0 &&
				top - offset <= window.innerHeight,
		);
	}, throttleMilliseconds);

	useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () =>
			window.removeEventListener('scroll', onScroll);
	});

	return [isVisible, currentElement];
}

// A hook that lets you analyze loading times for current page
export const usePerformanceGA = (
	variableName: string,
	categoryName = 'render time',
) => {
	const isMounted = useMounted();

	useEffect(() => {
		const currentTime = new Date().getMilliseconds();
		if (isMounted) {
			timingGA(
				categoryName,
				variableName,
				new Date().getMilliseconds() - currentTime,
			);
		}
	});
};

// A hook that keeps track of width used for mobile specific styles
export const useWidth = () => {
	const { state: width, update: setWidth } = useContext(
		WidthContext,
	);
	const handleResize = (e: UIEvent) => {
		let target = e.target as Window;
		setWidth(target.innerWidth);
	};
	useEffect(() => {
		setWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener(
				'resize',
				handleResize,
			);
		};
	});
	// return value for width and a boolean for convenient isMobile check
	return [width <= 900, width as number];
};

export const useScroll = () => {
	const [scroll, setScroll] = useState(0);

	useEffect(() => {
		const handleScroll = (e: WheelEvent) => {
			if (scroll + e.deltaY >= 0) {
				setScroll(scroll + e.deltaY);
			} else {
				!!scroll && setScroll(0);
			}
		};
		window.addEventListener('wheel', handleScroll);
		return () => {
			window.removeEventListener(
				'wheel',
				handleScroll,
			);
		};
	}, [scroll]);
	return [scroll];
};

const cache: any = {};

export function useGet<F>(
	url: string,
	conditional = true,
	options: QueryOptions = {},
) {
	const [data, setData] = useState<F>();
	const { cachePolicy = 'cache-first' } = options;
	const [isLoading, setIsLoading] = useState<boolean>(
		true,
	);
	const resp = useRef<any>(null);
	const history = useHistory();
	const mounted = useMounted();
	useEffect(() => {
		async function request() {
			try {
				if (
					cachePolicy === 'cache-first' &&
					cache[url]
				) {
					setData(cache[url]);
				}
				setIsLoading(true);
				resp.current = await makeRequest(
					url,
					'GET',
				);
				if (mounted.current) {
					if (cachePolicy === 'cache-first') {
						cache[url] = resp.current.data;
					}
					setData(resp.current.data);
				}
			} catch (e) {
				if (!e.response) {
				} else if (e.response.status === 401) {
					localStorage.clear();

					history.push(
						`/login?next=${history.location.pathname}`,
					);
				}
			} finally {
				if (mounted.current) {
					setIsLoading(false);
				}
			}
		}
		if (conditional && mounted.current) request();
	}, [url, conditional]);
	return [data, setData, isLoading] as const;
}

export const useAuth = () => {
	const { state, update } = useContext(AuthContext);
	useEffect(() => {
		async function checkAuth() {
			try {
				let resp = await makeRequest(
					'/token-auth/check-auth',
					'GET',
				);
				resp && update(resp.data.accessLevel);
			} catch (e) {
				console.log(e);
				update(0);
			}
		}
		checkAuth();
	}, [getLocal('user')?.user?.token]);
};
