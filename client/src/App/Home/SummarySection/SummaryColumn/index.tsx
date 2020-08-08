import React from 'react';
import {
	SummaryColumnDiv,
	SummaryColumnText,
	SummaryColumnTitle,
} from './Styles';
import { useWidth } from '../../../../Hooks';

const SummaryColumn: React.FC<{ title: string; text: string }> = ({
	title,
	text,
}) => {
	const [isMobile] = useWidth();

	return (
		<SummaryColumnDiv isMobile={isMobile}>
			<SummaryColumnTitle>{title.toUpperCase()}</SummaryColumnTitle>
			<SummaryColumnText>{text}</SummaryColumnText>
		</SummaryColumnDiv>
	);
};

export default SummaryColumn;
