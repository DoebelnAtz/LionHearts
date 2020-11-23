import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import { ButtonContainer, Slider } from './Styles';
import { color, colorAdjust } from '../../../Styles';
import { useDrag } from 'react-use-gesture';

type ToggleButtonProps = {
	state: boolean;
	setState: (newState: boolean) => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
	state,
	setState,
}) => {
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

	const off = 0;
	const on = 18;
	const [{ x }, set] = useSpring(() => ({
		x: state ? on : off,
	}));

	const open = ({ canceled }: any) => {
		console.log('open');
		setState(true);
		// when cancel is true, it means that the user passed the upwards threshold
		// so we change the spring config to create a nice wobbly effect
		set({
			x: on,
			immediate: false,
			config: canceled
				? { friction: 19, tension: 200 }
				: config.stiff,
		});
	};
	const close = (velocity = 0) => {
		console.log('close');
		setState(false);
		set({
			x: off,
			immediate: false,
			config: { ...config.stiff, velocity },
		});
	};

	const bind = useDrag(
		({
			last,
			first,
			dragging,
			vxvy: [vx, vy],
			movement: [mx, my],
			cancel,
			canceled,
		}) => {
			// console.log(
			// 	`last: ${last}\n`,
			// 	`movement-X: ${mx}\n`,
			// 	`speed-X: ${vx}\n`,
			// 	`is-dragging: ${dragging}\n`,
			// 	`exceed-limit: ${mx} / ${on + 30}`,
			// 	`closing: ${!dragging && mx === on}`,
			// );
			// if the user drags up passed a threshold, then we cancel
			// the drag so that the sheet resets to its open position
			if (mx > on + 2 && cancel) {
				cancel();
			}
			if (mx < off - 2 && cancel) {
				cancel();
			}

			// when the user releases the sheet, we check whether it passed
			// the threshold for it to close, or if we reset it to its open positino
			if (last) {
				if (vx < -0.5) {
					close(vy);
				} else if (vx > 0.5) {
					open(false);
				} else if (mx < 10) {
					close();
				} else {
					open(false);
				}
			} else if (!dragging && mx > off) {
				close();
			} else if (!dragging && mx <= off) {
				open(true);
			}
			// when the user keeps dragging, we just move the sheet according to
			// the cursor position
			else {
				set({ x: mx, immediate: true });
			}
		},
		{
			initial: () => [x.get(), 0],
			filterTaps: true,
			rubberband: true,
		},
	);

	const animateSlider = useSpring({
		config: slideConfig,
		transform: state
			? 'translateX(18px)'
			: 'translateX(0px)',
	});
	const animateBGColor = useSpring({
		config: BGConfig,
		backgroundColor: !state
			? colorAdjust.darken(color.BG5, 0.2)
			: colorAdjust.darken(color.primary, 0.2),
	});

	return (
		<ButtonContainer style={animateBGColor}>
			<Slider
				{...bind()}
				style={{
					x,
				}}
			/>
		</ButtonContainer>
	);
};

export default ToggleButton;
