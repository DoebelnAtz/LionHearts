import React from 'react';
import {
	CopyRight,
	FooterContainer,
	FooterContentDiv,
	FooterDiv,
	FooterNavDiv,
	LegalInfoDiv,
	LegalLink,
	LinkDiv,
	LogoDiv,
	RevokeCookieConsent,
	SoMeLinksDiv,
} from './Styles';
import Logo from '../Logo';
import { makeId } from '../../Utils';
import {
	FooterNavBarLink,
	FooterNavBarLinksDiv,
} from './Styles';
import { Link } from 'react-router-dom';
import { useWidth } from '../../Hooks';
import igIcon from '../../assets/images/ig_icon.png';
import fbIcon from '../../assets/images/facebook_icon.png';
import ytIcon from '../../assets/images/yt_icon.png';
import twitterIcon from '../../assets/images/twitter_icon.png';
import linkedinIcon from '../../assets/images/linkedin_icon.png';
import { NavBarLink } from '../NavBar/Styles';
// @ts-ignore
import PrivacyStatement from '../../assets/files/privacy-statement.pdf';

const Footer: React.FC = () => {
	const [isMobile] = useWidth();

	const handleCookieConsent = () => {
		document.cookie = `cookieCompliance=false; expires=${new Date(
			0,
		)}`;
		window.location.reload();
	};

	return (
		<FooterDiv>
			<FooterContainer>
				<FooterContentDiv isMobile={isMobile}>
					<LinkDiv
						isMobile={isMobile}
						id={'link'}
					>
						<LogoDiv>
							<Logo inverse />
						</LogoDiv>
						<FooterNavDiv
							isMobile={isMobile}
							id={'footer-nav'}
						>
							<FooterNavBarLinksDiv
								isMobile={isMobile}
							>
								<FooterNavBarLink
									inverse
									isMobile={isMobile}
								>
									<Link to={`/about-us`}>
										ABOUT US
									</Link>
								</FooterNavBarLink>
								<FooterNavBarLink
									inverse
									isMobile={isMobile}
								>
									<Link to={`/community`}>
										COMMUNITY
									</Link>
								</FooterNavBarLink>
								<FooterNavBarLink
									inverse
									isMobile={isMobile}
								>
									<Link to={`/events`}>
										EVENTS
									</Link>
								</FooterNavBarLink>
								<FooterNavBarLink
									inverse
									isMobile={isMobile}
								>
									<Link to={`/articles`}>
										ARTICLES
									</Link>
								</FooterNavBarLink>
								<FooterNavBarLink
									inverse
									isMobile={isMobile}
								>
									<Link to={`/apply`}>
										APPLY
									</Link>
								</FooterNavBarLink>
							</FooterNavBarLinksDiv>
						</FooterNavDiv>
						<SoMeLinksDiv>
							<img
								src={fbIcon}
								alt={'Lionhearts facebook'}
							/>
							<img
								src={twitterIcon}
								alt={'Lionhearts Twitter'}
							/>
							<img
								src={linkedinIcon}
								alt={'Lionhearts linkedIn'}
							/>
							<img
								src={igIcon}
								alt={'Lionhearts Instagram'}
							/>
							{/*<img src={ytIcon} alt={'Lionhearts Youtube'} />*/}
						</SoMeLinksDiv>
					</LinkDiv>
				</FooterContentDiv>
				<LegalInfoDiv>
					<CopyRight>© Co-founders Oy </CopyRight>
					<LegalLink href={PrivacyStatement}>
						Privacy Policy
					</LegalLink>
					<RevokeCookieConsent
						onClick={handleCookieConsent}
					>
						Revoke cookie consent
					</RevokeCookieConsent>
				</LegalInfoDiv>
			</FooterContainer>{' '}
		</FooterDiv>
	);
};

export default Footer;
