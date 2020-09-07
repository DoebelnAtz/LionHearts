import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	MenuBtnDiv,
	MidHelperDiv,
	NavBarDiv,
	NavBarLink,
	NavBarLinksDiv,
	NavBarLogoDiv,
	NavBarMemberIcon,
	TopHelperDiv,
} from './Styles';
import Logo from '../Logo';
import {
	useSpring,
	useChain,
	ReactSpringHook,
	useTransition,
} from 'react-spring';

import MemberIcon from '../../assets/images/white_member.svg';
import { Link } from 'react-router-dom';
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
			history.push('/members');
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
				<Logo />
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
				<img src={MemberIcon} />
			</NavBarMemberIcon>
		</NavBarDiv>
	);
};

export default NavBar;
