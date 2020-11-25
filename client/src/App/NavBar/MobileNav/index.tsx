import React, {
	Dispatch,
	RefObject,
	SetStateAction,
	useRef,
} from 'react';
import {
	MobileNavDiv,
	MobileNavLink,
	MobileNavLinks,
	MobileLinkContainer,
} from './Styles';
import {
	useChain,
	useSpring,
	useTrail,
	useTransition,
} from 'react-spring';
import { useHistory } from 'react-router-dom';
import { NavBarLink } from '../Styles';
import { makeId } from '../../../Utils';
import { Link } from 'react-router-dom';
import { useDismiss, useWidth } from '../../../Hooks';

const MobileNav: React.FC<{
	expanded: boolean;
	setExpanded: Dispatch<SetStateAction<boolean>>;
	expandRef: RefObject<HTMLDivElement>;
}> = ({ expanded, setExpanded, expandRef }) => {
	const menuRef = useRef<any>(null);
	const spanRef = useRef<any>(null);
	const [isMobile] = useWidth();
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const history = useHistory();

	const close = () => {
		setExpanded(false);
	};

	useDismiss(mobileMenuRef, close, expandRef);

	const expandMenu = useSpring({
		from: { height: '0px' },
		to: { height: !expanded ? '0px' : '510px' },
	});

	const links = [
		{ id: 0, text: 'HOME', location: '/' },
		{ id: 0, text: 'ABOUT US', location: '/about-us' },
		{
			id: 0,
			text: 'COMMUNITY',
			location: '/community',
		},
		{ id: 0, text: 'EVENTS', location: '/events' },
		{ id: 0, text: 'ARTICLES', location: '/articles' },
		{ id: 0, text: 'APPLY', location: '/apply' },
	];

	const config = {
		mass: 10,
		tension: 2000,
		friction: 200,
	};

	const trail = useTrail(links.length, {
		config,
		from: { opacity: 0 },
		to: { opacity: expanded ? 1 : 0 },
	});

	const handleLinkClick = (to: string) => {
		history.push(to);
	};

	return (
		<MobileNavLinks
			id={'mobile-nav'}
			style={expandMenu}
		>
			{expanded && (
				<MobileLinkContainer ref={mobileMenuRef}>
					{trail.map(({ opacity }, index) => (
						<MobileNavLink
							onClick={() =>
								handleLinkClick(
									links[index].location,
								)
							}
							style={{ opacity: opacity }}
							key={index}
						>
							<Link
								to={links[index].location}
							>
								{links[index].text}
							</Link>
						</MobileNavLink>
					))}
				</MobileLinkContainer>
			)}
		</MobileNavLinks>
	);
};

export default MobileNav;
