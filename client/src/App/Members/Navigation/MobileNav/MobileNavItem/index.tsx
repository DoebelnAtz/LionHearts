import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
	NavItemDiv,
	NavItemIcon,
	NavItemTitle,
} from './Styles';
import { CurrentNavContext } from '../../../../../Context/CurrentNavContext';

type NavItemProps = {
	title: string;
	path: string;
	tablet?: boolean;
};

const NavItem: React.FC<NavItemProps> = ({
	title,
	path,
	children,
	tablet,
}) => {
	const history = useHistory();
	const { state, update } = useContext(CurrentNavContext);
	const handleNavItemClick = () => {
		update(title.toLowerCase());
		history.push(path);
	};

	return (
		<NavItemDiv
			highlighted={
				state.toLowerCase() === title.toLowerCase()
			}
			tablet={tablet}
			onClick={handleNavItemClick}
		>
			<NavItemIcon>{children}</NavItemIcon>
			<NavItemTitle to={path}>{title}</NavItemTitle>
		</NavItemDiv>
	);
};

export default NavItem;
