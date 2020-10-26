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
	flex-direction: column;
	margin-bottom: 1vw;
`;

export const MemberListFilterTitle = styled.span`
	color: ${color.primary};
	font-size: 20px;
	line-height: 20px;
	padding-top: 4px;
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
	width: 140px;
	${components.buttonWhite};
	padding: 2px;
	display: flex;
	height: 32px;
`;

export const ExpandFilterButtonLabel = styled.span`
	line-height: 32px;
	margin: auto;
	padding-bottom: 2px;
`;

export const ExpandFilterOptionsButtonArrowIcon = styled(animated.img)`
	height: 18px;
	margin: auto 0 auto 0;
	padding: 0 8px;
	position: relative;
`;

export const FilterOptionsDiv = styled.div`
	width: 100%;
`;

export const FilterOptionsExpandable = styled(animated.div)`
	overflow-y: hidden;
	display: flex;
	margin: 0;
	justify-content: space-between;
	flex-direction: column;
	@media (max-width: ${units.tablet}) {
	}
`;

export const MemberFilterSkillsDiv = styled.div`
	display: flex;
	margin-top: ${units.margin};
`;

export const MemberFilterSearchDiv = styled.div`
	display: flex;
	margin-top: ${units.margin};
`;

export const MemberSearchInput = styled.input`
	width: 107px;
	border: 1px solid ${color.primary}!important;
`;

export const MemberFilterLanguageDiv = styled.div`
	display: flex;
	margin-top: ${units.margin};
`;

export const MemberListCard = styled.div`
	width: calc(50% - ${units.margin} * 2);
	margin: min(50px, max(6vw, 30px)) auto 20px auto;
	display: flex;
	border-width: 2px;
	border-color: ${color.secondary};
	border-style: solid;
	flex-direction: column;
	${cursor.clickable};
	&:hover {
		background-color: ${color.BG1};
		transition: background-color 0.1s;
	}
`;

export const MemberCardContent = styled.div`
	margin: 0 auto;
	padding: ${units.margin};
	width: calc(100% - ${units.margin} * 2);
`;

export const SearchMembersInput = styled.label`
	${components.labeledInput};
	margin: 0 auto 0 0;
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

export const MemberCardPicDiv = styled.div`
	width: 100%;
	height: min(40px, 6vw);
	min-height: 25px;
	display: flex;
`;

export const MemberCardPicContainer = styled.div`
	margin: 0 auto;
`;

export const MemberCardPic = styled.div`
	height: min(80px, 12vw);
	min-height: 50px;
	margin: 0 auto;
	bottom: 120%;
	background-color: ${color.BG0};
	position: relative;
	border: 6px solid ${color.BG0};
	border-radius: 50%;
	width: min(80px, 12vw);
	min-width: 50px;
`;
