import React, { ChangeEvent, useState } from 'react';
import { useSpring } from 'react-spring';
import {
	ExpandButton,
	ExpandableInputDiv,
	ExpandInput,
	ExpandButtonIconDiv,
	ExpandButtonIconContainer,
} from './Styles';

type expandableInputProps = {
	onChange: (newValue: string) => void;
	value: string;
	borderRadius: string;
};

const ExpandableInput: React.FC<expandableInputProps> = ({
	value,
	onChange,
	borderRadius = '4px',
}) => {
	const [expand, setExpand] = useState(false);

	const expandInput = useSpring({
		width: expand ? '100px' : '0px',
		padding: expand ? '0px 4px' : '0px 0px',
		transform: expand
			? 'translateX(0px)'
			: 'translateX(-4px)',
		delay: expand ? 200 : 0,
	});

	const animateIcon = useSpring({
		transform: expand
			? 'rotate(0deg)'
			: 'rotate(90deg)',
		delay: expand ? 0 : 0,
	});

	const expandInputButton = useSpring({
		borderRadius: expand
			? '4px 0px 0px 4px'
			: '4px 4px 4px 4px',
		delay: expand ? 0 : 300,
	});

	return (
		<ExpandableInputDiv>
			<ExpandButton
				onClick={() => setExpand(!expand)}
				style={expandInputButton}
			>
				<ExpandButtonIconContainer>
					<ExpandButtonIconDiv
						style={animateIcon}
					/>
					<ExpandButtonIconDiv />
				</ExpandButtonIconContainer>
			</ExpandButton>
			<ExpandInput
				value={value}
				onChange={(e: ChangeEvent) => {
					onChange(
						(e.target as HTMLInputElement)
							.value,
					);
				}}
				style={expandInput}
				placeholder={expand ? 'search' : ''}
			/>
		</ExpandableInputDiv>
	);
};

export default ExpandableInput;
