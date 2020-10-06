import styled from 'styled-components';
import { color, cursor, font, units } from '../../../../Styles';
import { Link } from 'react-router-dom';

export const NewsSectionDiv = styled.div`
	width: 100%;
	border-top: 1px solid ${color.primary};
	padding-bottom: 6vw;
	background-color: ${color.tertiary};
`;

export const NewsListDiv = styled.div`
	width: 70%;
	margin: auto min(10vw, 100px);
`;

export const NewsCarusel = styled.div`
	width: 100%;
	display: flex;
`;

export const NewsThumbnailList = styled.div`
	width: 100%;
	margin: auto 0;
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;
	& > div {
		margin-right: 3vw;
	}
	& > div:last-child {
		margin-right: 0;
	}
	flex-direction: row;
`;

export const ArticleThumbnail = styled.div`
	width: 25vw;
	min-width: 80px;
	max-width: 300px;
	max-height: 300px;
	min-height: 80px;
	height: 25vw;
	display: flex;
	@media (max-width: 900px) {
		width: 24vw;
		height: 24vw;
	}
`;

export const ArticleTitle = styled.div`
	${font.BBold};
	letter-spacing: 2px;
	color: #ffffff;
	width: 90%;
	margin: auto;
	word-break: break-word;
	position: relative;
	text-transform: uppercase;
	text-align: center;
	font-size: 20px;
	@media (max-width: 900px) {
		font-size: 2vw;
	}
`;

export const CaruselPagination = styled.div`
	max-height: 50px;
	height: 5vw;
		min-width:  min(10vw, 100px);

	width: min(10vw, 100px);
	min-height: 30px;
	${(props) => (props.show ? cursor.clickable : 'cursor: default')};
	margin: auto auto;
	background-image: url("${(props) => props.url}");
	background-position: center;
	background-repeat: no-repeat;
	background-size: contain;
`;

export const NewsHeaderLink = styled(Link)`
	text-decoration: none;
`;

export const NewsHeader = styled.h1`
	${font.DCBold};
	line-height: min(80px, 14vw);

	margin-bottom: ${units.margin};
	color: ${color.primary};
	font-size: min(86px, 14vw);
`;
