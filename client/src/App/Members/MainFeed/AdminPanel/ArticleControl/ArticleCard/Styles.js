import styled from 'styled-components';
import { color, cursor, font, units } from '../../../../../../Styles';

export const ArticleCardDiv = styled.div`
	width: 100%;
	margin: ${units.margin} 0;
	background-color: ${color.BG1};
`;

export const ArticleCardContents = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	${cursor.clickable};
	&:hover {
		background-color: ${color.BG2};
		transition: background-color 0.1s;
	}
`;

export const ArticleCardTitle = styled.span`
	${font.DCBold};
	color: ${color.primary};
	font-size: 16px;
	width: 33%;

	margin: auto ${units.margin};
`;

export const ArticleCardTime = styled.span`
	${font.DCBold};
	color: ${color.primary};
	font-size: 16px;
	width: 33%;
	text-align: center;
	margin: auto auto;
`;

export const ArticleCardName = styled.span`
	${font.DCBold};
	color: ${color.primary};
	font-size: 16px;
	width: 33%;
	text-align: right;
	margin: auto ${units.margin};
`;
