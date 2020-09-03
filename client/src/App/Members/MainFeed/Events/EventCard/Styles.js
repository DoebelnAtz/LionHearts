import styled from 'styled-components';
import { color, units, font, cursor } from '../../../../../Styles';

export const EventCardDiv = styled.div`
	width: calc(100% - ${units.margin} * 2);
	padding: ${units.margin};
	margin: 5px;
	${cursor.clickable};
	background-color: ${(props) =>
		props.highlighted ? `${color.primary}20` : color.BG2};
	&:hover {
		transition: background-color 0.1s;
		background-color: ${color.BG3};
	}
	@media (min-width: ${units.mobile}) {
		width: calc(50% - ${units.margin} * 3);
	}
`;

export const EventCardTitle = styled.span`
	${font.RBold};
	font-size: 18px;
	color: ${color.primary};
`;

export const EventCardResponseRow = styled.div`
	display: flex;
	width: 100%;
	margin-top: 10px;
	${font.RReg};
	& div {
		margin-left: auto;
	}
`;

export const EventCardTimeUntilDiv = styled.div`
	width: 100%;
	margin-top: 5px;
`;

export const EventCardTimeUntilSpan = styled.span`
	${font.RReg};
	font-size: 14px;
`;
