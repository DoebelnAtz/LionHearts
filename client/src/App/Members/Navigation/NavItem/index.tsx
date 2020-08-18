import React from 'react';
import { useHistory } from 'react-router-dom';
import { NavItemDiv, NavItemIcon, NavItemTitle } from './Styles';

type NavItemProps = {
	title: string;
	path: string;
};

const NavItem: React.FC<NavItemProps> = ({ title, path, children }) => {
	const history = useHistory();

	const handleNavItemClick = () => {
		history.push(path);
	};

	return (
		<NavItemDiv onClick={handleNavItemClick}>
			<NavItemIcon>{children}</NavItemIcon>
			<NavItemTitle to={path}>{title}</NavItemTitle>
		</NavItemDiv>
	);
};

export default NavItem;
