import React, { RefObject, useContext, useRef, useState } from 'react';
import {
	MainFeedContent,
	MainFeedDiv,
	MainFeedHeader,
	MainFeedLocation,
	MainFeedLogo,
	UserOption,
	UserOptionDropDown,
	UserOptionsMenu,
} from './Styles';
import { CurrentNavContext } from '../../../Context/CurrentNavContext';
import { Route, Switch, useHistory } from 'react-router-dom';
import MemberList from './Members';
import Applications from './Applications';
import { capitalizeFirst, getLocal } from '../../../Utils';
import { useDismiss } from '../../../Hooks';
import dropdownIcon from '../../../assets/images/dropdown.png';
import ProfilePage from './ProfilePage';
import ApplicationPage from './Applications/ApplicationPage';
import AdminPanel from './AdminPanel';
import Events from './Events';
import Logo from '../../Logo';

const MainFeed: React.FC = () => {
	const { state } = useContext(CurrentNavContext);
	const dropdown = useRef<HTMLDivElement>(null);
	const [expandOptions, setExpandOptions] = useState(false);
	const history = useHistory();

	useDismiss(dropdown, () => setExpandOptions(false));

	const handleLogout = () => {
		localStorage.removeItem('user');
		history.push('/');
	};

	return (
		<MainFeedDiv>
			<MainFeedHeader>
				<MainFeedLogo>
					<Logo compact inverse />
				</MainFeedLogo>
				<MainFeedLocation>{state}</MainFeedLocation>
			</MainFeedHeader>
			<MainFeedContent>
				<Switch>
					<Route exact path={'/members/list'}>
						<MemberList />
					</Route>
					<Route exact path={'/members/applications'}>
						<Applications />
					</Route>
					<Route exact path={'/members/applications/:aid'}>
						<ApplicationPage />
					</Route>
					<Route exact path={'/members/profile/:uid'}>
						<ProfilePage />
					</Route>
					<Route exact path={'/members/admin'}>
						<AdminPanel />
					</Route>
					<Route exact path={'/members/events'}>
						<Events />
					</Route>
				</Switch>
			</MainFeedContent>
		</MainFeedDiv>
	);
};

export default MainFeed;
