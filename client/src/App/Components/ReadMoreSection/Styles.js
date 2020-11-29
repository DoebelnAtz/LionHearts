import styled from 'styled-components';
import { animated as a } from 'react-spring';
import { color, cursor, font } from '../../../Styles';

export const ReadMoreSectionDiv = styled(a.div)`
	width: 100%;
	overflow-y: hidden;
	position: relative;
	&:after {
		background-image: linear-gradient(
			to bottom,
			transparent,
			white
		);
		transition: height 0.5s ease-in-out;
		height: ${(props) =>
			props.expanded ? '0' : '2em'};
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		display: block;
		content: '';
		z-index: 1;
	}
`;

export const ReadMoreContentContainer = styled.div``;

export const ReadMoreSpan = styled.span`
	color: ${color.primary};
	${cursor.clickable};
	${font.RReg};
	font-size: 14px;
	&:hover {
		color: ${color.primaryShade};
	}
`;
