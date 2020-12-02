import React, { useEffect, useRef, useState } from 'react';
import { AppDiv } from './Styles';
import {
	Route,
	Switch,
	useLocation,
} from 'react-router-dom';
import useVisibility, {
	useGet,
	usePerformanceGA,
	useWidth,
} from '../Hooks';
import cookie from 'cookie';
import Home from './MainSite/Home';
import './base.css';
import Signup from './Signup';
import Apply from './MainSite/Apply';
import LoginPopup from './LoginPopup';
import MembersHome from './Members';
import { WidthContextProvider } from '../Context/WidthContext';
import AboutUs from './MainSite/AboutUs';
import Events from './MainSite/Events';
import News from './MainSite/News';
import Community from './MainSite/Community';
import ArticlePage from './MainSite/News/ArticlePage';
import EventPage from './MainSite/Events/EventPage';
import NotFound from './MainSite/NotFoundPage';
import SuccessPage from './MainSite/Apply/SuccessPage';
import MemberLogin from './Members/Login';
import {
	initializeGA,
	pageViewGA,
} from '../Utils/GoogleAnalytics';
import CookieConsentPopup from './CookieConsentPopup';

function App() {
	const location = useLocation();
	const topRef = useRef<HTMLDivElement>(null);
	const [showCookieModal, setShowCookieModal] = useState(
		false,
	);
	let compliance = cookie.parse(document.cookie)
		.cookieCompliance;
	useEffect(() => {
		console.log(compliance);
		if (compliance === undefined) {
			setShowCookieModal(true);
		} else if (compliance) {
			initializeGA();
		}
	}, [compliance]);

	useEffect(() => {
		topRef.current?.scrollIntoView({
			behavior: 'smooth',
		});
		pageViewGA(location.pathname);
	}, [location.pathname]);

	usePerformanceGA('app', 'performance');

	return (
		<AppDiv
			id={'App'}
			style={{
				overflowY: showCookieModal
					? 'hidden'
					: 'auto',
			}}
		>
			<div
				ref={topRef}
				style={{ position: 'absolute', top: 0 }}
			/>
			{showCookieModal && (
				<CookieConsentPopup
					setShowCookieModal={setShowCookieModal}
				/>
			)}
			<Switch>
				<Route path={'/members'}>
					<Switch>
						<Route
							exact
							path={'/members/login'}
						>
							<MemberLogin />
						</Route>
						<Route path={'/members'}>
							<MembersHome />
						</Route>
					</Switch>
				</Route>
				<WidthContextProvider>
					<Route path={'/'}>
						<Switch>
							<Route exact path={'/'}>
								<Home />
							</Route>
							<Route exact path={'/login'}>
								<Home />
								<LoginPopup />
							</Route>
							<Route exact path={'/signup'}>
								<Signup />
							</Route>
							<Route exact path={'/apply'}>
								<Apply />
							</Route>
							<Route
								exact
								path={'/apply/success'}
							>
								<SuccessPage />
							</Route>
							<Route exact path={'/about-us'}>
								<AboutUs />
							</Route>
							<Route exact path={'/events'}>
								<Events />
							</Route>
							<Route
								exact
								path={'/events/:aid'}
							>
								<EventPage />
							</Route>
							<Route exact path={'/articles'}>
								<News />
							</Route>
							<Route exact path={'/404'}>
								<NotFound />
							</Route>
							<Route
								exact
								path={'/articles/:aid'}
							>
								<ArticlePage />
							</Route>
							<Route
								exact
								path={'/community'}
							>
								<Community />
							</Route>
						</Switch>
					</Route>
				</WidthContextProvider>
			</Switch>
		</AppDiv>
	);
}

export default App;
