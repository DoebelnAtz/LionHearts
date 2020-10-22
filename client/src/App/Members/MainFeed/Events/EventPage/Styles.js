import styled from 'styled-components';
import { color, components, font, units } from '../../../../../Styles';
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
	display: flex;
	flex-direction: column;
	width: calc(90%);
`;

export const EventPageInfoTitle = styled.h2`
	color: ${color.primary};
	${font.DCBold};
`;

export const EventPageInfoDate = styled.span`
	color: ${color.primary};
	${font.DCBold};
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
	height: 40px;
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
