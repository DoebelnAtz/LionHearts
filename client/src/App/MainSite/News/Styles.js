import styled from 'styled-components';
import { color, cursor, units } from '../../../Styles';
import { font } from '../../../Styles';

export const NewsPage = styled.div`
	height: 100%;
	width: 100%;

	background-color: ${color.BG0};
`;

export const NewsDiv = styled.div`
	max-width: 1200px;
	margin: ${units.margin} auto;
	width: 100%;
	background-color: ${color.BG0};
`;

export const NewsCard = styled.div`
	min-width: calc(33% - 15px);
	${cursor.clickable};
	display: flex;
	flex-direction: column;
	&:hover {
		& .thumbnail {
			transition: background-color 0.2s;
			background-color: ${color.primary};
		}
	}
	@media (max-width: 900px) {
		flex-direction: row;
		width: calc(100% - ${units.margin});
		margin: ${units.margin} ${units.margin} 0 ${units.margin}!important;
	}
`;

export const NewsList = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	& ${NewsCard}:nth-child(3n + 3) {
		margin: ${units.margin} ${units.margin} 0 ${units.margin};
	}
	& ${NewsCard} {
		margin: ${units.margin} 0 0 ${units.margin};
	}
`;

export const NewsCardContentContainer = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	margin: auto;
	@media (max-width: 900px) {
		margin: ${units.margin}!important;
	}
`;

export const NewsCardThumbnail = styled.div`
	width: 90%;
	margin: ${units.margin} auto;
	max-width: 22vw;
	min-width: 140px;
	min-height: 90px;
	height: 12vw;
`;

export const NewsCardTitle = styled.span`
	${font.DCBold};
	margin: ${units.margin} auto 0 0;
	font-size: 26px;
	color: ${color.primary};
	@media (max-width: 900px) {
		font-size: 6vw;
	}
`;

export const NewsCardDate = styled.span`
	${font.DCBold};
	margin: ${units.margin} auto ${units.margin} 0;
	color: ${color.secondary};
	font-size: 16px;
`;
