import React from 'react';
import {
	FooterContentDiv,
	FooterDiv,
	FooterNavDiv,
	LinkDiv,
	SoMeLinksDiv,
} from './Styles';
import Logo from '../Logo';
import { makeId } from '../../Utils';
import { NavBarLink, NavBarLinksDiv } from '../NavBar/Styles';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
	return (
		<FooterDiv>
			<FooterContentDiv>
				<LinkDiv id={'link'}>
					<Logo inverse />
					<FooterNavDiv id={'footer-nav'}>
						<NavBarLinksDiv>
							<NavBarLink inverse>ABOUT US</NavBarLink>
							<NavBarLink inverse>COMMUNITY</NavBarLink>
							<NavBarLink inverse>EVENTS</NavBarLink>
							<NavBarLink inverse>NEWS</NavBarLink>
							<NavBarLink inverse>
								<Link to={`/apply?application=${makeId(16)}`}>
									APPLY
								</Link>
							</NavBarLink>
						</NavBarLinksDiv>
					</FooterNavDiv>
					<SoMeLinksDiv></SoMeLinksDiv>
				</LinkDiv>
			</FooterContentDiv>
		</FooterDiv>
	);
};

export default Footer;
