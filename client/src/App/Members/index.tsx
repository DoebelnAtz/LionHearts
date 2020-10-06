import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
	EventFeedDiv,
	MemberHomeDiv,
	MemberHomeMainDiv,
	MemberMainDiv,
	MemberMobileNavDiv,
	MemberNavigationDiv,
	MemberViewDiv,
} from './Styles';
import Navigation from './Navigation';
import MainFeed from './MainFeed';
import EventFeed from './EventFeed';
import { getLocal } from '../../Utils';
import { CurrentNavContextProvider } from '../../Context/CurrentNavContext';
import { useAuth } from '../../Hooks';
import MobileNav from './Navigation/MobileNav';

const MembersHome: React.FC = () => {
	const history = useHistory();

	useEffect(() => {

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
						<MemberViewDiv id={'main-view'}>
							<MainFeed />
						</MemberViewDiv>
						<EventFeedDiv id={'events'}>
							<EventFeed />
						</EventFeedDiv>
					</MemberMainDiv>
					<MemberMobileNavDiv id={'mobile-nav'}>
						<MobileNav />
					</MemberMobileNavDiv>
				</MemberHomeMainDiv>
			</MemberHomeDiv>
		</CurrentNavContextProvider>
	);
};

export default MembersHome;
