import styled from 'styled-components';
import { color, units, font } from '../../../Styles';

export const EventTitleDiv = styled.div`
	display: flex;
	width: 100%;
	height: 47px;
`;

export const EventList = styled.div`
	width: calc(100% - 0px);
	margin-top: ${units.margin};
	background-color: ${color.BG1};
`;

export const EventListOptionDiv = styled.div`
	width: calc(100% - ${units.margin} * 2);
	display: flex;
	border-top: 2px solid ${color.BG1};
	padding: ${units.margin} ${units.margin} 0 ${units.margin};
	margin-top: 20px;
`;

export const EventTitleSpan = styled.span`
	margin: auto auto auto ${units.margin};
	${font.DCBold};
	font-size: 24px;
	color: ${color.primary};
`;

export const FilterOptionLabel = styled.span`
	margin-right: auto;
	${font.RReg};
`;

export const EventFeedDiv = styled.div`
	background-color: ${color.BG0};
	width: calc(100% - ${units.margin} * 1);
	margin: 20px ${units.margin} ${units.margin} ${units.margin};
	border-radius: ${units.radius};
	padding-bottom: ${units.margin};
`;
