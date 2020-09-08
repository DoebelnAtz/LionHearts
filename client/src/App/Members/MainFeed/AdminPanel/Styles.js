import styled from 'styled-components';
import { font, color, units, cursor } from '../../../../Styles';

export const AdminPanelDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const AdminPanelNavTabs = styled.div`
	width: 100%;
	display: flex;
	height: 50px;
	flex-wrap: nowrap;
`;

export const AdminPanelTab = styled.div`
	text-transform: uppercase;
	color: ${color.primary};
	${font.DCBold};
	font-size: 26px;
	padding: ${units.margin} 0;
	width: 50%;
	text-align: center;
	${cursor.clickable};
	border-bottom: 2px solid
		${(props) => (props.highlighted ? color.secondary : color.BG0)};
	&:hover {
		background-color: ${color.BG1};
	}
`;

export const AdminPanelFeed = styled.div`
	width: 100%;
`;
