import styled from 'styled-components';
import { color, units, font } from '../../../../Styles';

export const EventTitleDiv = styled.div`
	display: flex;
	width: 100%;
	height: 47px;
`;

export const EventList = styled.div`
	width: calc(100% - 0px);
	display: flex;
	flex-wrap: wrap;
	margin-top: ${units.margin};
`;

export const EventListOptionDiv = styled.div`
	width: calc(100% - ${units.margin} * 2);
	display: flex;
	margin: 30px ${units.margin} 0 ${units.margin};
`;

export const EventTitleSpan = styled.span`
	margin: auto auto auto ${units.margin};
	${font.DCBold};
	font-size: 24px;
	color: ${color.primary};
`;

export const FilterOptionLabel = styled.span`
	margin-right: ${units.margin};
	${font.RReg};
	font-size: 16px;
	line-height: 30px;
`;

export const EventFeedDiv = styled.div`
	background-color: ${color.BG0};
	width: calc(100% - ${units.margin} * 2);
	margin: ${units.margin} ${units.margin} ${units.margin}
		${units.margin};
	border-radius: ${units.radius};
	padding-bottom: ${units.margin};
`;
