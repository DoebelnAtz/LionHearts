import React from 'react';
import {
	NavBarDiv,
	NavBarLink,
	NavBarLinksDiv,
	NavBarLogoDiv,
	NavBarMemberIcon,
} from './Styles';
import Logo from '../Logo';

import MemberIcon from '../../assets/images/profile_icon.png';
import { Link } from 'react-router-dom';
import { makeId } from '../../Utils';

const NavBar = () => {
	return (
		<NavBarDiv>
			<NavBarLogoDiv>
				<Logo />
			</NavBarLogoDiv>
			<NavBarLinksDiv>
				<NavBarLink>ABOUT US</NavBarLink>
				<NavBarLink>COMMUNITY</NavBarLink>
				<NavBarLink>EVENTS</NavBarLink>
				<NavBarLink>NEWS</NavBarLink>
				<NavBarLink>
					<Link to={`/apply?application=${makeId(16)}`}>APPLY</Link>
				</NavBarLink>
			</NavBarLinksDiv>
			<NavBarMemberIcon>
				<img src={MemberIcon} />
			</NavBarMemberIcon>
		</NavBarDiv>
	);
};

export default NavBar;
