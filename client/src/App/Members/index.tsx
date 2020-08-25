import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
	EventFeedDiv,
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
import { CurrentNavContextProvider } from '../../Context/CurrentNavContext';
import { useAuth } from '../../Hooks';

const MembersHome: React.FC = () => {
	const history = useHistory();

	useEffect(() => {
		console.log(window.location);
		if (!getLocal('user')) {
			history.push('/');
		}
	}, []);
	useAuth();
	return (
		<CurrentNavContextProvider>
			<MemberHomeDiv id={'member-site-container'}>
				<MemberHomeMainDiv id={'member-site'}>
					<MemberMainDiv id={'member-main'}>
						<MemberNavigationDiv id={'navigation'}>
							<Navigation />
						</MemberNavigationDiv>
						<MemberViewDiv id={'mainView'}>
							<MainFeed />
						</MemberViewDiv>
						<EventFeedDiv id={'events'}>
							<EventFeed />
						</EventFeedDiv>
					</MemberMainDiv>
				</MemberHomeMainDiv>
			</MemberHomeDiv>
		</CurrentNavContextProvider>
	);
};

export default MembersHome;
