import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { makeRequest } from '../Api';
import { WidthContext } from '../Context/WidthContext';
import { useHistory } from 'react-router';
import { useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect =
	typeof window !== 'undefined' ? useLayoutEffect : useEffect;
// custom hook for easy modal dismissal
export const useDismiss = (
	refInside: RefObject<HTMLDivElement | null>,
	close: () => void,
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
		if (refInside?.current?.contains(target)) return;
		else close();
	};
	useEffect(() => {
		document.addEventListener('keydown', handleEsc);
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);
};

const isBrowser = typeof window !== `undefined`;

function getScrollPosition({ element, useWindow }: any) {
	if (!isBrowser) return { x: 0, y: 0 };

	const target = element ? element.current : document.body;
	const position = target.getBoundingClientRect();

	return useWindow
		? { x: window.scrollX, y: window.scrollY }
		: { x: position.left, y: position.top };
}

export function useScrollPosition(
	effect?: any,
	deps?: [],
	element?: boolean,
	useWindow?: boolean,
	wait?: null,
) {
	const position = useRef(getScrollPosition({ useWindow }));

	let throttleTimeout: NodeJS.Timeout | null = null;

	const callBack = () => {
		const currPos = getScrollPosition({ element, useWindow });
		effect({ prevPos: position.current, currPos });
		position.current = currPos;
		throttleTimeout = null;
	};

	useIsomorphicLayoutEffect(() => {
		if (!isBrowser) {
			return;
		}

		const handleScroll = () => {
			if (wait) {
				if (throttleTimeout === null) {
					throttleTimeout = setTimeout(callBack, wait);
				}
			} else {
				callBack();
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			throttleTimeout && clearTimeout(throttleTimeout);
		};
	}, deps);
}

useScrollPosition.defaultProps = {
	deps: [],
	element: false,
	useWindow: false,
	wait: null,
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

// A hook that keeps track of width used for mobile specific styles
export const useWidth = () => {
	const { state: width, update: setWidth } = useContext(WidthContext);
	//const [width, setWidth] = useState(window.innerWidth);
	const handleResize = (e: UIEvent) => {
		let target = e.target as Window;
		setWidth(target.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
	// return value for width and a boolean for convenient isMobile check
	return [width <= 900, width];
};

export const useScroll = () => {
	const [scroll, setScroll] = useState(0);

	useEffect(() => {
		const handleScroll = (e: WheelEvent) => {
			console.log(window.pageYOffset);
			if (scroll + e.deltaY >= 0) {
				setScroll(scroll + e.deltaY);
			} else {
				!!scroll && setScroll(0);
			}
		};
		window.addEventListener('wheel', handleScroll);
		return () => {
			console.log('stopped listening');
			window.removeEventListener('wheel', handleScroll);
		};
	}, [scroll]);
	return [scroll];
};

export function useGet<F>(url: string, conditional = true) {
	const [data, setData] = useState<F>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const resp = useRef<any>(null);
	const history = useHistory();
	const mounted = useMounted();
	useEffect(() => {
		async function request() {
			try {
				setIsLoading(true);
				resp.current = await makeRequest(url, 'GET');
				if (mounted.current) {
					setData(resp.current.data);
				}
			} catch (e) {
				if (!e.response) {
				} else if (e.response.status === 401) {
					localStorage.clear();
					console.log('unauth');
					history.push(`/login?next=${history.location.pathname}`);
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
