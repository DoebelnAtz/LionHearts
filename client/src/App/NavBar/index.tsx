import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	MenuBtnDiv,
	NavBarDiv,
	NavBarLink,
	NavBarLinksDiv,
	NavBarLogoDiv,
	NavBarMemberIcon,
} from './Styles';
import Logo from '../Logo';

import MemberIcon from '../../assets/images/white_member.svg';
import { getLocal, makeId } from '../../Utils';
import { useWidth } from '../../Hooks';
import MenuBurger from '../Components/MenuBurger';
import MobileNav from './MobileNav';

const NavBar = () => {
	const [isMobile] = useWidth();
	const [expandMenu, setExpandMenu] = useState(false);
	const history = useHistory();
	const burgerRef = useRef<HTMLDivElement>(null);

	const handleMemberIconClick = () => {
		if (getLocal('user')) {
			history.push('/members/list');
		} else {
			history.push('/login');
		}
	};

	return (
		<NavBarDiv>
			<MobileNav
				expanded={!!(expandMenu && isMobile)}
				setExpanded={setExpandMenu}
				expandRef={burgerRef}
			/>
			{isMobile && (
				<MenuBtnDiv ref={burgerRef}>
					<MenuBurger open={expandMenu} setOpen={setExpandMenu} />
				</MenuBtnDiv>
			)}
			<NavBarLogoDiv id={'Navbar Logo'} isMobile={isMobile}>
				<Logo height={isMobile ? '40ps' : '50px'} />
			</NavBarLogoDiv>
			{!isMobile && (
				<NavBarLinksDiv>
					<NavBarLink to={`/about-us`}>ABOUT US</NavBarLink>
					<NavBarLink to={`/community`}>COMMUNITY</NavBarLink>
					<NavBarLink to={`/events`}>EVENTS</NavBarLink>
					<NavBarLink to={`/news`}>NEWS</NavBarLink>
					<NavBarLink to={`/apply`}>APPLY</NavBarLink>
				</NavBarLinksDiv>
			)}
			<NavBarMemberIcon
				onClick={handleMemberIconClick}
				isMobile={isMobile}
			>
				<img alt={'member-side'} src={MemberIcon} />
			</NavBarMemberIcon>
		</NavBarDiv>
	);
};

export default NavBar;
