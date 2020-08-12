import React from 'react';
import { AppDiv } from './Styles';
import { Route, Switch } from 'react-router-dom';
import { useGet, useWidth } from '../Hooks';

import Home from './Home';
import './base.css';
import Signup from './Signup';
import Apply from './Apply';
import Footer from './Footer';
import LoginPopup from './LoginPopup';
import MembersHome from './Members';

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
					</Switch>
				</Route>
			</Switch>
		</AppDiv>
	);
}

export default App;
