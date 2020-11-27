import styled from 'styled-components';
import { color, cursor, font, units } from '../../../../Styles';
import { Link } from 'react-router-dom';

export const NewsSectionDiv = styled.div`
	width: 100%;
	padding-bottom: 6vw;
	background-color: ${color.BG0};
`;

export const NewsListDiv = styled.div`
	width: 40%;
	margin: auto min(10vw, 100px);
`;

export const NewsCarusel = styled.div`
	width: 100%;
	display: flex;
`;

export const NewsThumbnailList = styled.div`
	width: calc(100% - min(10vw, 100px) * 2);
	margin: auto;
	overflow-x: scroll;
	display: flex;
	scroll-snap-type: x mandatory;
	padding-bottom: 20px;
`;

export const ArticleThumbnail = styled.div`
	width: 200px;
	min-width: 200px;
	height: 200px;
	scroll-snap-align: start;
	margin-right: 6vw;
	&:last-child {
		margin-right: 0;
	}
	@media (max-width: 900px) {
		width: 140px;
		min-width: 140px;
		height: 140px;
	}
`;

export const ArticleTitle = styled.div`
	${font.BBold};
	letter-spacing: 1px;
	color: #ffffff;
	width: 90%;
	margin: auto;
	word-break: break-word;
	position: relative;
	text-transform: uppercase;
	text-align: center;
	font-size: 18px;
	@media (max-width: 900px) {
		font-size: calc(10px + 1vw);
	}
`;

export const CaruselPagination = styled.div`
	max-height: 50px;
	height: 5vw;
	width: min(10vw, 100px);
	min-width:  min(10vw, 100px);
	min-height: 30px;
	${(props) => (props.show ? cursor.clickable : 'cursor: default')};
	margin: auto auto;
	background-image: url("${(props) => props.url}");
	background-position: center;
	background-repeat: no-repeat;
	background-size: contain;
`;

export const EventsHeaderLink = styled(Link)`
	text-decoration: none;
`;

export const NewsHeader = styled.h1`
	${font.DCBold};
	line-height: min(80px, 14vw);
	margin-bottom: ${units.margin};
	color: ${color.primary};
	font-size: min(86px, 14vw);
`;
