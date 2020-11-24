import React, { useRef } from 'react';
import { useSpring } from 'react-spring';
import {
	ExpandableDivContainer,
	ExpandableDivContent,
} from './Styles';

type ExpandableDivProps = {
	open: boolean;
	offset?: number;
	config?: {
		tension?: number;
		mass?: number;
		velocity?: number;
		friction?: number;
		clamp?: boolean;
	};
};

const ExpandableDiv: React.FC<ExpandableDivProps> = ({
	open,
	offset = 0,
	config,
	children,
}) => {
	const expandTarget = useRef<HTMLDivElement>(null);

	const expandDivSpring = useSpring({
		maxHeight: open
			? offset +
			  (expandTarget.current?.offsetHeight || 0) +
			  'px'
			: '0px',
		config: config || {
			tension: 200,
			mass: 2,
			friction: 50,
		},
	});
	return (
		<ExpandableDivContainer style={expandDivSpring}>
			<ExpandableDivContent ref={expandTarget}>
				{children}
			</ExpandableDivContent>
		</ExpandableDivContainer>
	);
};

export default ExpandableDiv;
