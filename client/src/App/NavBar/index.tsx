import React from 'react';
import {
	BurgerBotDiv,
	BurgerMidDiv,
	BurgerTopDiv,
	MenuBtnDiv,
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
import { useWidth } from '../../Hooks';

const NavBar = () => {
	const [isMobile] = useWidth();
	return (
		<NavBarDiv>
			{isMobile && (
				<MenuBtnDiv>
					<BurgerTopDiv />
					<BurgerMidDiv />
					<BurgerBotDiv />
				</MenuBtnDiv>
			)}
			<NavBarLogoDiv isMobile={isMobile}>
				<Logo />
			</NavBarLogoDiv>
			{!isMobile && (
				<NavBarLinksDiv>
					<NavBarLink>ABOUT US</NavBarLink>
					<NavBarLink>COMMUNITY</NavBarLink>
					<NavBarLink>EVENTS</NavBarLink>
					<NavBarLink>NEWS</NavBarLink>
					<NavBarLink>
						<Link to={`/apply?application=${makeId(16)}`}>
							APPLY
						</Link>
					</NavBarLink>
				</NavBarLinksDiv>
			)}
			<NavBarMemberIcon>
				<img src={MemberIcon} />
			</NavBarMemberIcon>
		</NavBarDiv>
	);
};

export default NavBar;
