import styled from 'styled-components';
import {
	color,
	components,
	font,
	units,
} from '../../../../../Styles';
import { animated } from 'react-spring';

export const EventPageDiv = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const EventPageInfoDiv = styled.div`
	background-color: ${color.tertiary};
	padding: 5%;
	height: initial;
	display: flex;
	flex-shrink: 0;
	flex-direction: column;
	width: calc(90%);
`;

export const EventPageInfoTitle = styled.input`
	color: ${color.primary};
	background-color: #00000000;
	border: 1px solid ${color.primary};
	font-size: 28px;
	height: 30px;
	margin-bottom: 1em;
	margin-top: 0;
	margin-right: auto;
	${font.DCBold};
	&:disabled {
		border: none;
		opacity: 1;
		padding: 0;
	}
	&:focus {
		outline: none;
	}
`;

export const DeleteEventButton = styled.button`
	${components.buttonWhite};
	margin-right: ${units.margin};
`;

export const EventPageInfoDate = styled.span`
	color: ${color.primary};
	${font.DCBold};
	font-size: 18px;
`;

export const EditButtonRow = styled.div`
	display: flex;
	width: 100%;
`;

export const EditButton = styled.button`
	${components.buttonWhite};
	margin-left: auto;
	height: 30px;
`;

export const EventPageInfoParticipantsIcon = styled.img`
	height: 20px;
	width: 20px;
`;

export const EventPageParticipantsDiv = styled.div`
	display: flex;
`;

export const EventPageInfoParticipants = styled.span`
	color: ${color.primary};
	${font.DCBold};
	padding-top: 2px;
	margin-left: 5px;
	font-size: 18px;
`;

export const EventPageCreator = styled.span`
	color: ${color.primary};
	${font.DCBold};
	font-size: 18px;
`;

export const CreateCommentDiv = styled(animated.div)`
	width: 100%;
	margin-top: 20px;
	overflow-y: hidden;
`;

export const CreateCommentEditor = styled(animated.div)`
	width: 100%;
	height: 200px;
`;

export const CreateCommentButton = styled.button`
	width: 100%;

	margin-bottom: ${units.margin};
	${components.buttonWhite};
`;

export const SubmitCommentButton = styled.button`
	width: calc(100%);
	position: relative;
	top: -28px;
	${components.buttonWhite};
`;

export const EventPageCommentFeed = styled.div`
	width: 100%;
	display: flex;
	margin-top: ${units.margin};
	flex-direction: column;
	& > div:last-child {
		border-bottom: 2px solid ${color.secondary};
	}
`;

export const EventPageCommentSection = styled.div`
	width: calc(100% - ${units.margin} * 2);
	margin: 0 auto;
	height: 100%;
`;
