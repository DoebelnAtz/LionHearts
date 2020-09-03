import React from 'react';
import { useHistory } from 'react-router-dom';
import { NavItemDiv, NavItemIcon, NavItemTitle } from './Styles';
import { useWidth } from '../../../../Hooks';

type NavItemProps = {
	title: string;
	path: string;
	tablet?: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ title, path, children, tablet }) => {
	const history = useHistory();

	const handleNavItemClick = () => {
		history.push(path);
	};

	return (
		<NavItemDiv tablet={tablet} onClick={handleNavItemClick}>
			<NavItemIcon>{children}</NavItemIcon>
			<NavItemTitle to={path}>{title}</NavItemTitle>
		</NavItemDiv>
	);
};

export default NavItem;
