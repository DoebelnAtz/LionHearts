import styled from 'styled-components';
import { units, font, color, cursor } from '../../../../../../Styles';
import { animated } from 'react-spring';

export const EventCommentDiv = styled.div`
	width: calc(100%);
	padding: ${units.margin};
	display: flex;
	flex-direction: column;
	border-top: 2px solid ${color.secondary};
`;

export const EventCommentContainer = styled.div`
	display: flex;
	width: 100%;
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

export const EventCommentEditor = styled(animated.div)`
	width: calc(100%);
	height: 140px;
	margin: ${units.margin} auto 0 auto;
	overflow-y: hidden;
`;

export const EventCommentInfo = styled.div`
	display: flex;
	width: calc(100%);
`;

export const EventCommentActionRow = styled.div`
	display: flex;
	margin-top: ${units.margin};
`;

export const EventCommentReplyButton = styled.img`
	height: 24px;
	padding: 4px;
	border-radius: 6px;
	right: -4px;
	margin-left: auto;
	position: relative;
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
`;

export const EventCommentSection = styled(animated.div)`
	width: 100%;
	overflow-y: hidden;
`;

export const EventCommentFeed = styled.div`
	width: 100%;
	margin-top: ${units.margin};

	position: relative;
	overflow-y: auto;
`;

export const EventCommentInfoDate = styled.span`
	${font.DCBold};
	margin-left: auto;
	color: ${color.primary};
`;

export const EventCommentContent = styled.div`
	width: calc(100%);
`;
