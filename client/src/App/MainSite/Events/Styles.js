import styled from 'styled-components';
import { color, cursor, units } from '../../../Styles';
import { font } from '../../../Styles';

export const EventsPage = styled.div`
	height: 100%;
	width: 100%;

	background-color: ${color.BG0};
`;

export const EventsDiv = styled.div`
	width: calc(100% - min(10vw, 100px) * 2);
	margin: 30px min(10vw, 100px);
	background-color: ${color.BG0};
	display: flex;
	background-color: ${color.BG0};
`;

export const EventCard = styled.div`
	${cursor.clickable};
	width: calc(33% - calc(40px / 3));
	display: flex;
	margin-bottom: 40px;
	flex-direction: column;
	transition: all 0.2s ease-in-out;
	&:hover {
		background-color: ${color.tertiary};
		& .thumbnail {
			background-color: ${color.primary};
		}
	}
	@media (max-width: 900px) {
		flex-direction: row;

		width: calc(100% - ${units.margin});
		margin: ${units.margin} 0 20px 0 !important;
	}
`;

export const EventList = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	& ${EventCard}:nth-child(3n+2) {
		margin: 0 20px 40px 20px;
	}
`;

export const EventCardContentContainer = styled.div`
	width: 100%;
	display: flex;
	padding: 10px;
	min-height: 100px;
	flex-direction: column;
	margin: 0;
	@media (max-width: 900px) {
		height: calc(12vw - 20px);
		min-height: 70px;

		margin: 0 !important;
	}
`;

export const EventCardThumbnail = styled.div`
	width: 100%;
	min-height: 90px;
	min-width: 140px;
	height: 12vw;
	@media (max-width: 900px) {
		width: 140px;
	}
`;

export const EventCardTitle = styled.span`
	${font.DCBold};
	margin: ${units.margin} 0 auto 0;
	font-size: 26px;
	color: ${color.primary};
	@media (max-width: 900px) {
		font-size: calc(14px + 2vw);
		margin: ${units.margin} auto 0 ${units.margin};
	}
`;

export const EventCardDate = styled.span`
	${font.DCBold};
	margin: auto auto 0 0;
	color: ${color.secondary};
	font-size: 16px;
	@media (max-width: 900px) {
		margin: ${units.margin} auto 0 ${units.margin};
	}
`;
