import React from 'react';
import { useSpring } from 'react-spring';
import { ButtonContainer, Slider } from './Styles';
import { color, colorAdjust } from '../../../Styles';

type ToggleButtonProps = {
	state: boolean;
	onClick: any;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ state, onClick }) => {
	const slideConfig = {
		mass: 3,
		tension: 1000,
		friction: 100,
		clamp: true,
		velocity: 2,
	};

	const BGConfig = {
		mass: 50,
		tension: 370,
		friction: 10,
		clamp: true,
		velocity: 1,
	};
	const animateSlider = useSpring({
		config: slideConfig,
		transform: state ? 'translateX(18px)' : 'translateX(0px)',
	});
	const animateBGColor = useSpring({
		config: BGConfig,
		backgroundColor: !state
			? colorAdjust.darken(color.BG5, 0.2)
			: colorAdjust.darken(color.primary, 0.2),
	});

	return (
		<ButtonContainer onClick={onClick} style={animateBGColor}>
			<Slider style={animateSlider} />
		</ButtonContainer>
	);
};

export default ToggleButton;
