import styled from 'styled-components';
import {
	units,
	font,
	color,
	cursor,
	components,
} from '../../../../../../Styles';
import { animated } from 'react-spring';

export const EventCommentDiv = styled.div`
	width: calc(100% - ${units.margin} * 2);
	padding: ${units.margin};
	display: flex;
	flex-direction: column;
	border-top: 2px solid ${color.tertiary};
`;

export const EventCommentContainer = styled.div`
	display: flex;
	width: 100%;
	padding-top: 10px;
	height: auto;
`;

export const EventChildCommentContainer = styled.div`
	display: flex;
	width: calc(100%);
	border-left: 4px solid ${color.tertiary};
	padding: 5px 0 5px 16px;
	height: auto;
`;

export const EventCommentPicCol = styled.div`
	width: 60px;
	border-left: 4px dotted ${color.tertiary};
	padding-right: ${units.margin};
`;

export const EventChildCommentPicCol = styled.div`
	width: 40px;
	padding-right: ${units.margin};
`;

export const EventChildCommentContentCol = styled.div`
	width: calc(100% - 50px);
	display: flex;
	margin-right: auto;
	flex-direction: column;
`;

export const EventCommentContentCol = styled.div`
	width: calc(100% - 50px);
	display: flex;
	flex-direction: column;
`;

export const EventCommentResponseDiv = styled.div`
	width: calc(100% - 40px);
    padding: 20px;
    background-color: ${color.tertiary};
`;

export const EventCommentEditor = styled.div`
	width: calc(100%);
	overflow-y: hidden;
`;

export const EventCommentSubmitButton = styled.button`
	width: calc(100%);
	${components.buttonWhite};
	margin-top: 0;
`;

export const EventCommentTextarea = styled.textarea`
	width: calc(100% - 24px);
	color: ${color.text};
	${font.RReg};
	//box-shadow: inset 0px 0px 10px 10px ${color.BG1};
	flex-shrink: 0;
	border-radius: 0;
	padding: 10px;
	resize: none;
	font-size: 16px;
	border: 2px solid ${color.primary};
	
	margin-bottom: 0;
	&:focus {
		outline: none;
		border-color: ${color.primaryShade};
	}
`;

export const EventCommentInfo = styled.div`
	display: flex;
	width: calc(100%);
`;

export const EventCommentActionRow = styled.div`
	display: flex;
	margin-top: ${units.margin};
`;

export const EventCommentChildrenCounter = styled.span`
	${font.DCBold};
	color: ${color.primary};
	font-size: 20px;
	padding-top: 6px;
	margin: auto 0 auto auto;
`;

export const EventCommentReplyButton = styled.img`
	height: 24px;
	padding: 4px;
	border-radius: 6px;
	margin-left: ${units.margin};
	background-color: ${color.BG0};
	${cursor.clickable};
	transition: background-color 0.2s ease-in-out;
	&:hover {
		background-color: ${color.tertiary};
	}
`;

export const EventCommentInfoUsername = styled.span`
	${font.DCBold};
	font-size: 20px;
	color: ${color.primary};
`;

export const EventChildCommentProfilePic = styled.div`
	height: 40px;
	width: 40px;
`;

export const EventCommentProfilePic = styled.div`
	height: 50px;
	width: 50px;
	padding: 4px;
	transform: translateX(-4px);
	background-color: ${color.BG0};
`;

export const EventCommentSection = styled(animated.div)`
	width: 100%;

	overflow-y: hidden;
`;

export const EventCommentFeed = styled.div`
	width: 100%;
	margin-top: ${units.margin};
	margin-bottom: 20px;
	overflow-y: auto;
`;

export const EventCommentInfoDate = styled.span`
	${font.DCBold};
	margin-left: auto;
	color: ${color.primary};
`;

export const EventCommentContent = styled.div`
	width: calc(100%);
	${font.RReg};
`;
