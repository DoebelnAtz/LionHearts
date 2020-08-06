import React, { useRef, useState } from 'react';
import {
	BotHelperDiv,
	BurgerBotDiv,
	BurgerMidDiv,
	BurgerTopDiv,
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

import MemberIcon from '../../assets/images/profile_icon.png';
import { Link } from 'react-router-dom';
import { makeId } from '../../Utils';
import { useWidth } from '../../Hooks';
import MenuBurger from '../Components/MenuBurger';

const NavBar = () => {
	const [isMobile] = useWidth();
	const [expandMenu, setExpandMenu] = useState(false);

	return (
		<NavBarDiv>
			{isMobile && (
				<MenuBtnDiv>
					<MenuBurger open={expandMenu} setOpen={setExpandMenu} />
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
