import React, { Dispatch, SetStateAction } from 'react';
import { StyledBurger } from './Styles';
const MenuBurger: React.FC<{
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
	return (
		<StyledBurger
			ariaLabel={'open menu button'}
			open={open}
			onClick={() => setOpen(!open)}
		>
			<div />
			<div />
			<div />
		</StyledBurger>
	);
};

export default MenuBurger;
