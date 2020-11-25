import styled from 'styled-components';
import { color, components, units } from '../../../../Styles';
import { font } from '../../../../Styles';

export const EventsDiv = styled.div`
	width: 100%;
	background-color: ${color.BG0};
`;

export const ArticleContainer = styled.div`
	width: 80%;
	max-width: 1000px;
	margin: ${units.margin} auto 60px min(96px, 16vw);
	@media (max-width: 900px) {
		margin: ${units.margin} auto 60px min(10vw, 100px);
	}
`;

export const ArticleHeader = styled.h1`
	font-size: 66px;
	color: ${color.primary};
	${font.DCBold};
`;

export const ButtonDiv = styled.div`
	width: 100%;
	margin-top: ${units.margin};
`;

export const BackToEventsButton = styled.div`
	display: flex;
	${components.buttonWhite};
	text-align: center;
	width: fit-content;
	& img {
		height: 18px;
		margin: auto 5px auto 0;
	}
	& span {
		line-height: 16px;
		margin: auto 0;
		padding-top: 6px;
	}
`;

export const ArticleContentContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

export const ArticleInfo = styled.div`
	width: 100%;
	letter-spacing: 0.5px;
	word-spacing: 2px;
	padding-bottom: ${units.margin};
	border-bottom: 4px solid ${color.secondary};
`;

export const ArticleInfoDate = styled.span`
	${font.DCBold};
	color: ${color.text};
`;

export const ArticleInfoCreator = styled.span`
	${font.DCBold};
	color: ${color.primary};
`;

export const ArticleContent = styled.div`
	margin-top: ${units.margin};
	width: 100%;
	height: 100%;
`;

export const EventsList = styled.div`
	height: 100%;
	width: 100%;
	background-color: ${color.BG0};
`;
