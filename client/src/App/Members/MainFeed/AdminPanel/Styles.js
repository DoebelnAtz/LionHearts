import styled from 'styled-components';
import {
	font,
	color,
	units,
	cursor,
} from '../../../../Styles';

export const AdminPanelDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	overflow-y: hidden;
`;

export const AdminPanelNavTabs = styled.div`
	width: 100%;
	display: flex;
	height: 50px;
	flex-shrink: 0;

	flex-wrap: nowrap;
`;

export const AdminPanelTab = styled.div`
	text-transform: uppercase;
	color: ${color.header};
	${font.DCBold};
	font-size: 26px;
	padding: ${units.margin} 0;
	width: 50%;
	text-align: center;
	${cursor.clickable};
	border-bottom: 2px solid
		${(props) =>
			props.highlighted
				? color.secondary
				: color.BG2};
	&:hover {
		background-color: ${color.BG1};
		border-bottom-color: ${(props) =>
			props.highlighted
				? color.secondary
				: color.tertiary};
	}
`;

export const AdminPanelFeed = styled.div`
	width: 100%;
	overflow-y: auto;
`;
