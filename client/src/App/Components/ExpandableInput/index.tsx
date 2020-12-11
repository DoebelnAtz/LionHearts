import React, {ChangeEvent, useRef, useState} from 'react';
import { useSpring } from 'react-spring';
import {
	ExpandButton,
	ExpandableInputDiv,
	ExpandInput,
	ExpandButtonIconDiv,
	ExpandButtonIconContainer,
} from './Styles';
import { color } from '../../../Styles';

type expandableInputProps = {
	onChange: (newValue: string) => void;
	value: string;
	height?: string;
	backgroundColor?: string;
};

const ExpandableInput: React.FC<expandableInputProps> = ({
	value,
	onChange,
	height = '28px',
	backgroundColor = color.primary,
}) => {
	const [expand, setExpand] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const expandInput = useSpring({
		width: expand ? '100px' : '0px',
		padding: expand ? '0px 4px' : '0px 0px',
		transform: expand
			? 'translateX(0px)'
			: 'translateX(-4px)',
		delay: expand ? 100 : 0,
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

	const handleExpandButtonClick = () => {
		if(!expand)
			inputRef.current?.focus();
		else
			inputRef.current?.blur();
		setExpand(!expand)
	};

	return (
		<ExpandableInputDiv>
			<ExpandButton
				height={height}
				onClick={handleExpandButtonClick}
				style={expandInputButton}
				backgroundColor={backgroundColor}
			>
				<ExpandButtonIconContainer>
					<ExpandButtonIconDiv
						style={animateIcon}
					/>
					<ExpandButtonIconDiv />
				</ExpandButtonIconContainer>
			</ExpandButton>
			<ExpandInput
				ref={inputRef}
				height={height}
				backgroundColor={backgroundColor}
				value={value || ''}
				onChange={(e: ChangeEvent) => {
					let target = e.target as HTMLInputElement;
					onChange(
						target.value
					);
				}}
				style={expandInput}
				placeholder={expand ? 'search' : ''}
			/>
		</ExpandableInputDiv>
	);
};

export default ExpandableInput;
