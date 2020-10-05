import styled from 'styled-components';
import { color, cursor, units } from '../../../Styles';
import { font } from '../../../Styles';

export const EventsPage = styled.div`
	height: 100%;
	width: 100%;

	background-color: ${color.BG0};
`;

export const EventsDiv = styled.div`
	max-width: 1200px;
	margin: ${units.margin} auto auto auto;
	width: 100%;

	background-color: ${color.BG0};
`;

export const EventCard = styled.div`
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

export const EventList = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	& ${EventCard}:nth-child(3n + 3) {
		margin: ${units.margin} ${units.margin} 0 ${units.margin};
	}
	& ${EventCard} {
		margin: ${units.margin} 0 0 ${units.margin};
	}
`;

export const EventCardContentContainer = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	margin: auto;
	@media (max-width: 900px) {
		margin: ${units.margin}!important;
	}
`;

export const EventCardThumbnail = styled.div`
	width: 90%;
	margin: ${units.margin} auto;
	max-width: 22vw;
	min-width: 140px;
	min-height: 90px;
	height: 12vw;
`;

export const EventCardTitle = styled.span`
	${font.DCBold};
	margin: ${units.margin} auto 0 0;
	font-size: 26px;
	color: ${color.primary};
	@media (max-width: 900px) {
		font-size: 6vw;
	}
`;

export const EventCardDate = styled.span`
	${font.DCBold};
	margin: ${units.margin} auto ${units.margin} 0;
	color: ${color.secondary};
	font-size: 16px;
`;
