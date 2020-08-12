import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
	EventFeedDiv,
	MemberHeaderDiv,
	MemberHomeDiv,
	MemberHomeMainDiv,
	MemberMainDiv,
	MemberNavigationDiv,
	MemberViewDiv,
} from './Styles';
import Navigation from './Navigation';
import MainFeed from './MainFeed';
import EventFeed from './EventFeed';
import { getLocal } from '../../Utils';

const MembersHome: React.FC = () => {
	const history = useHistory();

	useEffect(() => {
		console.log(window.location);
		if (!getLocal('user')) {
			history.push('/');
		}
	}, []);
	return (
		<MemberHomeDiv>
			<MemberHomeMainDiv>
				<MemberMainDiv>
					<MemberNavigationDiv>
						<Navigation />
					</MemberNavigationDiv>
					<MemberViewDiv>
						<MainFeed />
					</MemberViewDiv>
					<EventFeedDiv>
						<EventFeed />
					</EventFeedDiv>
				</MemberMainDiv>
			</MemberHomeMainDiv>
		</MemberHomeDiv>
	);
};

export default MembersHome;
