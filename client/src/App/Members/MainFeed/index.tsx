import React, { RefObject, useContext, useRef, useState } from 'react';
import {
	MainFeedContent,
	MainFeedDiv,
	MainFeedHeader,
	MainFeedLocation,
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
				<MainFeedLocation>{state}</MainFeedLocation>
				<UserOptionDropDown
					ref={dropdown}
					onClick={() => setExpandOptions(!expandOptions)}
				>
					Hello{' '}
					{capitalizeFirst(
						getLocal('user').user.username.substr(
							0,
							getLocal('user').user.username.length - 1,
						),
					)}
					<img src={dropdownIcon} />
					{expandOptions && (
						<UserOptionsMenu>
							<UserOption onClick={handleLogout}>
								Logout
							</UserOption>
						</UserOptionsMenu>
					)}
				</UserOptionDropDown>
			</MainFeedHeader>
			<MainFeedContent>
				<Switch>
					<Route exact path={'/members/list'}>
						<MemberList />
					</Route>
					<Route exact path={'/members/applications'}>
						<Applications />
					</Route>
				</Switch>
			</MainFeedContent>
		</MainFeedDiv>
	);
};

export default MainFeed;
