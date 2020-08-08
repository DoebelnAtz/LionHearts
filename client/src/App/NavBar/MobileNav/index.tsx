import React, { Dispatch, RefObject, SetStateAction, useRef } from 'react';
import {
	MobileNavDiv,
	MobileNavLink,
	MobileNavLinks,
	MobileLinkContainer,
} from './Styles';
import {
	ReactSpringHook,
	useChain,
	useSpring,
	useTrail,
	useTransition,
} from 'react-spring';
import { NavBarLink } from '../Styles';
import { makeId } from '../../../Utils';
import { Link } from 'react-router-dom';
import { useDismiss, useWidth } from '../../../Hooks';

const MobileNav: React.FC<{
	expanded: boolean;
	setExpanded: Dispatch<SetStateAction<boolean>>;
	expandRef: RefObject<HTMLDivElement>;
}> = ({ expanded, setExpanded, expandRef }) => {
	const menuRef = useRef<ReactSpringHook>(null);
	const spanRef = useRef<ReactSpringHook>(null);
	const [isMobile] = useWidth();
	const mobileMenuRef = useRef<HTMLDivElement>(null);

	const close = () => {
		setExpanded(false);
	};

	useDismiss(mobileMenuRef, close, expandRef);

	const expandMenu = useSpring({
		ref: menuRef,
		from: { height: '0px' },
		to: { height: !expanded ? '0px' : '450px' },
	});

	const fadeIn = useSpring({
		ref: spanRef,
		from: { opacity: '1' },
		to: { opacity: !expanded ? '1' : '0' },
	});

	const links = [
		{ id: 0, text: 'ABOUT US', location: '/' },
		{ id: 0, text: 'COMMUNITY', location: '/' },
		{ id: 0, text: 'EVENTS', location: '/' },
		{ id: 0, text: 'NEWS', location: '/' },
		{ id: 0, text: 'APPLY', location: '/apply' },
	];

	const config = { mass: 10, tension: 2000, friction: 200 };

	const trail = useTrail(links.length, {
		config,
		opacity: expanded ? 1 : 0,
		from: { opacity: 0 },
	});

	useChain(expanded ? [menuRef] : [menuRef], expanded ? [0] : [1]);

	return (
		<MobileNavLinks
			id={'Mobile Nav'}
			expanded={expanded}
			style={expandMenu}
			isMobile={isMobile}
		>
			{expanded && (
				<MobileLinkContainer ref={mobileMenuRef}>
					{trail.map(({ opacity }, index) => (
						<MobileNavLink style={{ opacity: opacity }} key={index}>
							<Link to={links[index].location}>
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
