import styled from 'styled-components';
import { color, font, units } from '../../../../../Styles';

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

export const EventPageCommentSection = styled.div`
	width: calc(100% - ${units.margin} * 2);
	margin: 0 auto;
`;
