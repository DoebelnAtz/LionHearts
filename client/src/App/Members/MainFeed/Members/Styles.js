import styled from 'styled-components';
import {
	color,
	units,
	font,
	cursor,
	components,
} from '../../../../Styles';
import { animated } from 'react-spring';

export const MemberListDiv = styled.div`
	width: 100%;
	height: calc(100% - ${units.margin});
	display: flex;
	margin: ${units.margin} 0 0 0;
	flex-direction: column;
	overflow-y: hidden;
`;

export const MemberListOptions = styled.div`
	width: calc(100% - ${units.margin} * 2);
	margin: 0 ${units.margin};
	display: flex;
	position: relative;
	flex-direction: column;
	margin-bottom: 1vw;
`;

export const MemberListFilterTitle = styled.span`
	color: ${color.primary};
	font-size: 20px;
	line-height: 20px;
	padding-top: 4px;
	margin-right: auto;
	${font.DCBold};
`;

export const MemberListResultDiv = styled(animated.div)`
	display: flex;
	flex-wrap: wrap;
	padding: 5px 0;
	margin-top: 30px;
	overflow-y: auto;
	width: 100%;
`;

export const FilterListContainer = styled.div`
	height: 0px;
	position: relative;
	box-shadow: 0px 3px 6px #aaaaaa;
	z-index: 6;
	border-top: 2px solid ${color.primary};
`;

export const FilterListDiv = styled(animated.div)`
	height: 250px;
	touch-action: none;
	user-select: none;
	display: flex;
	position: absolute;
	padding: ${units.margin};
	z-index: 4;
	background-color: ${color.BG0};
	flex-direction: column;
	width: calc(100% - ${units.margin} * 2 - 4px);
	border: 2px solid ${color.primary};
`;

export const FilterOptionsContainer = styled.div`
	width: 100%;
	margin: auto 0 ${units.margin} 0;
`;

export const DragIcon = styled.div`
	margin: auto;
	width: 24px;
	display: flex;
	flex-direction: column;
`;

export const DragIconLine = styled.div`
	height: 2px;
	margin-bottom: 3px;
	background-color: ${color.BG1};
	&:last-child {
		margin-bottom: 0;
	}
`;

export const FilterListDragHandle = styled.div`
	height: 30px;
	width: 120px;
	display: flex;
	${cursor.draggable};
	margin: 0 auto 0 auto;
	transform: translateY(26px);
	border-radius: 4px;
	background-color: ${color.primary};
	&:active {
		${cursor.dragging}
	}
	& span {
		${font.DCBold};
		font-size: 20px;
		margin: auto;
		text-transform: uppercase;
		padding-top: 6px;
		color: ${color.BG0};
	}
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

export const ExpandFilterOptionsButtonArrowIcon = styled(
	animated.img,
)`
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
	width: 300px;
	margin-top: ${units.margin};
	@media (max-width: ${units.mobile}) {
		width: 100%;
	}
`;

export const MemberFilterSearchDiv = styled.div`
	display: flex;
	width: 300px;
	margin-top: ${units.margin};
	@media (max-width: ${units.mobile}) {
		width: 100%;
	}
`;

export const MemberSearchInput = styled.input`
	${components.input};
	width: 120px;
	border: 1px solid ${color.primary}!important;
`;

export const MemberFilterLanguageDiv = styled.div`
	display: flex;
	width: 300px;
	margin-top: ${units.margin};
	@media (max-width: ${units.mobile}) {
		width: 100%;
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
	width: 100%;
	height: 24px;
	display: flex;
	flex-direction: row;
`;

export const MemberListCard = styled.div`
	width: calc(50% - ${units.margin} * 2 - 4px);
	margin: min(50px, max(6vw, 30px)) auto 20px
		${units.margin};
	display: flex;
	border-width: 2px;
	border-color: ${color.tertiary};
	border-style: solid;
	transition: all 0.2s;
	flex-direction: column;
	${cursor.clickable};
	&:hover {
		box-shadow: 0px 0px 6px 2px ${color.BG2};
		transform: scale(1.02);
		background-color: ${color.tertiary};
	}
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
