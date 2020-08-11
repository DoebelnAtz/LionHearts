import React from 'react';
import {
	EventFeedDiv,
	MemberHeaderDiv,
	MemberHomeDiv,
	MemberHomeMainDiv,
	MemberMainDiv,
	MemberNavigationDiv,
	MemberViewDiv,
} from './Styles';

const MembersHome: React.FC = () => {
	return (
		<MemberHomeDiv>
			<MemberHomeMainDiv>
				<MemberMainDiv>
					<MemberNavigationDiv>Navigation</MemberNavigationDiv>
					<MemberViewDiv>View</MemberViewDiv>
					<EventFeedDiv>Events</EventFeedDiv>
				</MemberMainDiv>
			</MemberHomeMainDiv>
		</MemberHomeDiv>
	);
};

export default MembersHome;
