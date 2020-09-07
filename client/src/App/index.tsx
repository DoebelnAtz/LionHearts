import React from 'react';
import { AppDiv } from './Styles';
import { Route, Switch } from 'react-router-dom';
import { useGet, useWidth } from '../Hooks';

import Home from './MainSite/Home';
import './base.css';
import Signup from './Signup';
import Apply from './MainSite/Apply';
import Footer from './Footer';
import LoginPopup from './LoginPopup';
import MembersHome from './Members';
import { WidthContextProvider } from '../Context/WidthContext';
import AboutUs from './MainSite/AboutUs';
import Events from './MainSite/Events';
import News from './MainSite/News';
import Community from './MainSite/Community';

function App() {
	const [isMobile] = useWidth();
	return (
		<AppDiv>
			<Switch>
				<Route path={'/members'}>
					<Switch>
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
							<Route exact path={'/about-us'}>
								<AboutUs />
							</Route>
							<Route exact path={'/events'}>
								<Events />
							</Route>
							<Route exact path={'/news'}>
								<News />
							</Route>
							<Route exact path={'/community'}>
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
