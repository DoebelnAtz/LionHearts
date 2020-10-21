import styled from 'styled-components';
import { color, units, font, cursor, components } from '../../../../Styles';
import { animated } from 'react-spring';

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
	height: 100%;
	overflow-y: auto;
	width: 100%;
`;

export const ExpandFilterOptionsButton = styled.button`
	width: 100px;
	${components.buttonWhite};
`;

export const FilterOptionsDiv = styled.div`
	width: 100%;
`;

export const FilterOptionsExpandable = styled(animated.div)`
	overflow-y: hidden;
	display: flex;
	margin: ${units.margin} 0;
`;

export const MemberListCard = styled.div`
	width: calc(50% - ${units.margin} * 2);
	margin: 30px auto 20px auto;
	display: flex;
	border-width: 0 0 2px 0;
	border-color: ${color.secondary};
	border-style: solid;
	flex-direction: column;
	${cursor.clickable};
`;

export const MemberCardContent = styled.div`
	border-width: 2px 2px 0 2px;
	border-color: ${color.secondary};
	border-style: solid;
	margin: 0 auto;
	padding: max(40px, 6vw) ${units.margin} ${units.margin} ${units.margin};
	width: calc(100% - ${units.margin} * 2);
	&:hover {
		background-color: ${color.BG1};
		transition: background-color 0.1s;
	}
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
	@media (max-width: ${units.mobile}) {
		font-size: calc(10px + 2vw);
	}
`;

export const MemberCardInfo = styled.div`
	display: flex;
	width: 90%;
	text-align: center;
	margin: 0 auto ${units.margin} auto;
	flex-direction: column;
	@media (max-width: ${units.mobile}) {
		font-size: calc(10px + 1vw);
	}
`;

export const MemberCardStudy = styled.span`
	color: ${color.text};
	font-size: 16px;
	${font.RReg};
	@media (max-width: ${units.mobile}) {
		font-size: calc(10px + 1vw);
	}
`;

export const MemberCardLocation = styled.span`
	color: ${color.text};
	font-size: 16px;
	margin-top: ${units.margin};
	${font.RReg};
	@media (max-width: ${units.mobile}) {
		font-size: calc(10px + 1vw);
	}
`;

export const MemberCardPic = styled.div`
	height: min(100px, 12vw);
	min-height: 50px;
	margin: 0 auto;
	background-color: ${color.BG0};
	position: relative;
	top: max(30px, 4vw);
	border: 6px solid ${color.BG0};
	border-radius: 50%;
	width: min(100px, 12vw);
	min-width: 50px;
`;
