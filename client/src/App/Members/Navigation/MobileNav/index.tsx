import React from 'react';
import { MobileNavDiv } from './Styles';

import MembersIcon from '../../../../assets/images/memberlist.svg';
import ApplicationsIcon from '../../../../assets/images/applications_icon.png';
import EventsIcon from '../../../../assets/images/events.svg';
import ProfileIcon from '../../../../assets/images/blue_member.svg';
import ConfigIcon from '../../../../assets/images/cogwheel_blue.png';
import { checkAuth, getLocal } from '../../../../Utils';
import NavItem from './MobileNavItem';

const MobileNav: React.FC = () => {
	return (
		<MobileNavDiv>
			<NavItem title={'Members'} path={'/members/list'}>
				<img src={MembersIcon} />
			</NavItem>
			<NavItem
				title={'Profile'}
				path={`/members/profile/${getLocal('user')?.user?.u_id}`}
			>
				<img src={ProfileIcon} />
			</NavItem>
			<NavItem tablet title={'Events'} path={`/members/events`}>
				<img src={EventsIcon} />
			</NavItem>
			{checkAuth() > 2 && (
				<NavItem title={'Applications'} path={'/members/applications'}>
					<img src={ApplicationsIcon} />
				</NavItem>
			)}
			{checkAuth() > 3 && (
				<NavItem title={'Admin'} path={'/members/admin'}>
					<img src={ConfigIcon} />
				</NavItem>
			)}
		</MobileNavDiv>
	);
};

export default MobileNav;
