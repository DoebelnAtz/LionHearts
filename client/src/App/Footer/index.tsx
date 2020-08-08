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
import { FooterNavBarLink, FooterNavBarLinksDiv } from './Styles';
import { Link } from 'react-router-dom';
import { useWidth } from '../../Hooks';

const Footer: React.FC = () => {
	const [isMobile] = useWidth();
	return (
		<FooterDiv>
			<FooterContentDiv isMobile={isMobile}>
				<LinkDiv isMobile={isMobile} id={'link'}>
					<Logo inverse />
					<FooterNavDiv id={'footer-nav'}>
						<FooterNavBarLinksDiv isMobile={isMobile}>
							<FooterNavBarLink inverse isMobile={isMobile}>
								ABOUT US
							</FooterNavBarLink>
							<FooterNavBarLink inverse isMobile={isMobile}>
								COMMUNITY
							</FooterNavBarLink>
							<FooterNavBarLink inverse isMobile={isMobile}>
								EVENTS
							</FooterNavBarLink>
							<FooterNavBarLink inverse isMobile={isMobile}>
								NEWS
							</FooterNavBarLink>
							<FooterNavBarLink inverse isMobile={isMobile}>
								<Link to={`/apply?application=${makeId(16)}`}>
									APPLY
								</Link>
							</FooterNavBarLink>
						</FooterNavBarLinksDiv>
					</FooterNavDiv>
					<SoMeLinksDiv></SoMeLinksDiv>
				</LinkDiv>
			</FooterContentDiv>
		</FooterDiv>
	);
};

export default Footer;
