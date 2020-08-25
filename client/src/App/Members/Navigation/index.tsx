import React from 'react';
import { MemberNavDiv, NavItemIcon } from './Styles';
import NavLogo from './NavLogo';
import NavItem from './NavItem';

import MembersIcon from '../../../assets/images/memberlist.svg';
import ProfileIcon from '../../../assets/images/blue_member.svg';
import ConfigIcon from '../../../assets/images/cogwheel_blue.png';
import { checkAuth, getLocal } from '../../../Utils';

const Navigation: React.FC = () => {
	return (
		<MemberNavDiv>
			<NavLogo />
			<NavItem title={'Members'} path={'/members/list'}>
				<img src={MembersIcon} />
			</NavItem>
			<NavItem
				title={'Profile'}
				path={`/members/profile/${getLocal('user').user.u_id}`}
			>
				<img src={ProfileIcon} />
			</NavItem>
			{checkAuth() > 2 && (
				<NavItem title={'Applications'} path={'/members/applications'}>
					<img src={ProfileIcon} />
				</NavItem>
			)}
			{checkAuth() > 3 && (
				<NavItem title={'Admin'} path={'/members/admin'}>
					<img src={ConfigIcon} />
				</NavItem>
			)}
		</MemberNavDiv>
	);
};

export default Navigation;
