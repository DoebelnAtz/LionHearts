import React from 'react';
import { MemberNavDiv, NavItemIcon } from './Styles';
import NavLogo from './NavLogo';
import NavItem from './NavItem';

import MemberIcon from '../../../assets/images/profile_icon.png';
import { checkAuth } from '../../../Utils';

const Navigation: React.FC = () => {
	return (
		<MemberNavDiv>
			<NavLogo />
			<NavItem title={'Members'} path={'/members/list'}></NavItem>
			<NavItem title={'Profile'} path={'/members/profile'}></NavItem>
			{checkAuth() > 2 && (
				<NavItem
					title={'Applications'}
					path={'/members/applications'}
				/>
			)}
		</MemberNavDiv>
	);
};

export default Navigation;
