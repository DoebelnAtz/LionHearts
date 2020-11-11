import styled from 'styled-components';

import { color, units } from '../../Styles';

const MemberNavigationWidth = '220px';
const NavigationMobileWidth = '60px';
const EventFeedWidth = '250px';
const MobileNavHeight = '60px';

export const MemberHomeDiv = styled.div`
	height: 100%;
	width: 100%;
	background-color: ${color.BG0};
	display: flex;
`;

export const MemberNavigationDiv = styled.div`
	background-color: ${color.BG0};
	width: ${MemberNavigationWidth};
	@media (max-width: ${units.tablet}) {
		width: ${NavigationMobileWidth};
	}
	@media (max-width: ${units.mobile}) {
		display: none;
	}
`;

export const EventFeedDiv = styled.div`
	background-color: ${color.BG0};
	height: 100%;
	overflow-y: auto;
	width: ${EventFeedWidth};
	@media (max-width: ${units.tablet}) {
		display: none;
	}
`;

export const MemberViewDiv = styled.div`
	background-color: ${color.BG0};
	margin: 0 5px;
	width: calc(
		100% - ${MemberNavigationWidth} - ${units.margin} -
			${EventFeedWidth}
	);
	@media (max-width: ${units.tablet}) {
		width: calc(100% - ${NavigationMobileWidth});
		margin: 0 0 0 5px;
	}
	@media (max-width: ${units.mobile}) {
		width: 100%;
		margin: 0;
	}
`;

export const MemberHomeMainDiv = styled.div`
	height: calc(100%);
	width: min(calc(100% - ${units.margin} * 2), 1400px);
	margin: auto;
	@media (max-width: ${units.tablet}) {
		width: 100%;
	}
`;

export const MemberMobileNavDiv = styled.div`
	height: ${MobileNavHeight};
	border-top: solid 5px ${color.BG2};
	display: none;
	@media (max-width: ${units.mobile}) {
		display: block;
	}
`;

export const MemberMainDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	background-color: ${color.BG2};

	@media (max-width: ${units.mobile}) {
		background-color: ${color.BG0};
		height: calc(
			100% - ${MobileNavHeight} - 5px -
				env(safe-area-inset-bottom)
		);
	}
`;
