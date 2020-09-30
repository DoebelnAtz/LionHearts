import styled from 'styled-components';
import { color, font, units } from '../../../../Styles';

export const NewsSectionDiv = styled.div`
	max-height: 460px;
	height: 100%;
	width: 100%;
	border-top: 1px solid ${color.primary};
	background-color: ${color.tertiary};
`;

export const NewsListDiv = styled.div`
	max-width: 1600px;
	width: 80%;
	margin: auto min(10vw, 100px);
`;

export const NewsThumbnailList = styled.div`
	max-width: 1600px;
	width: 80%;
	margin: auto min(10vw, 100px);
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;
	& > div {
		margin-right: auto;
	}
	& > div:last-child {
		margin-right: 0;
	}
`;

export const ArticleThumbnail = styled.div`
	width: 200px;
	min-width: 140px;
	min-height: 140px;
	height: 200px;
`;

export const CaruselPagination = styled.div`
	height: 50px;
	width: 40px;
	min-width: 80px;
	min-height: 50px;
	margin: auto ${units.margin};
	background-image: url("${(props) => props.url}");
	background-position: center;
	background-repeat: no-repeat;
	background-size: contain;
`;

export const NewsHeader = styled.h1`
	${font.DCBold};
	margin-bottom: ${units.margin};
	color: ${color.primary};
	font-size: min(96px, 16vw);
`;
