import React, { useContext } from 'react';
import {
	MainFeedContent,
	MainFeedDiv,
	MainFeedHeader,
	MainFeedLocation,
} from './Styles';
import { CurrentNavContext } from '../../../Context/CurrentNavContext';
import { Route, Switch } from 'react-router-dom';
import MemberList from './Members';
import Applications from './Applications';

const MainFeed: React.FC = () => {
	const { state } = useContext(CurrentNavContext);

	return (
		<MainFeedDiv>
			<MainFeedHeader>
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
				</Switch>
			</MainFeedContent>
		</MainFeedDiv>
	);
};

export default MainFeed;
