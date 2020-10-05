import styled from 'styled-components';
import { color, units, font, cursor, components } from '../../../../Styles';

export const MemberListDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const MemberListOptions = styled.div`
	width: calc(100% - ${units.margin} * 2);
	padding: ${units.margin};
	display: flex;
	margin-bottom: 2vw;
`;

export const MemberListFilterTitle = styled.span`
	color: ${color.primary};
	font-size: 22px;
	margin-right: ${units.margin};
	${font.DCBold};
`;

export const MemberListResultDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
`;

export const MemberListCard = styled.div`
	width: calc(50% - ${units.margin} * 2);
	margin: 20px auto 20px auto;
	display: flex;
	flex-direction: column;
	border: 2px solid ${color.tertiary};
	${cursor.clickable};
	&:hover {
		background-color: ${color.BG1};
		transition: background-color 0.1s;
	}
`;

export const MemberCardContent = styled.div`
	margin: 0 auto;
	width: 100%;
`;

export const SearchMembersInput = styled.label`
	${components.labeledInput};
	margin: 0 ${units.margin} 0 auto;
	height: 24px;
	display: flex;
	flex-direction: row;
`;

export const MemberCardName = styled.div`
	${font.DCBold};
	text-align: center;
	color: ${color.primary};
	text-transform: uppercase;
	font-size: 24px;
	margin-bottom: ${units.margin};
`;

export const MemberCardInfo = styled.div`
	display: flex;
	width: 90%;
	text-align: center;
	margin: 0 auto ${units.margin} auto;
	flex-direction: column;
	@media (max-width: ${units.mobile}) {
		font-size: 3vw !important;
	}
`;

export const MemberCardStudy = styled.span`
	color: ${color.text};
	font-size: 16px;
	${font.RReg};
	@media (max-width: ${units.mobile}) {
		font-size: 3vw !important;
	}
`;

export const MemberCardLocation = styled.span`
	color: ${color.text};
	font-size: 16px;
	margin-top: ${units.margin};
	${font.RReg};
	@media (max-width: ${units.mobile}) {
		font-size: 3vw !important;
	}
`;

export const MemberCardPic = styled.div`
	height: min(100px, 12vw);
	min-height: 50px;
	margin: 0 auto;
	position: relative;
	top: max(-40px, -6vw);
	border: 6px solid ${color.BG0};
	border-radius: 50%;
	width: min(100px, 12vw);
	min-width: 50px;
`;
