import styled from 'styled-components';
import { color, components, font, units } from '../../../../../Styles';

export const DataBaseControlDiv = styled.div`
	width: calc(100% - ${units.margin} * 2);
	margin: ${units.margin} auto;
`;

export const DataBaseControlOption = styled.div`
	width: 100%;
	padding: ${units.margin} 0;
	display: flex;
	flex-direction: column;
	border-bottom: 3px solid ${color.tertiaryShade};
`;

export const DataBaseControlControls = styled.div`
	width: 100%;
	padding: ${units.margin} 0;
	display: flex;
	flex-direction: row;
`;

export const LabeledControlInput = styled.label`
	${components.labeledInput};
	margin-right: ${units.margin};
`;

export const ButtonRow = styled.div`
	width: 100%;
`;

export const DataBaseControlOptionTitle = styled.span`
	${font.DCBold};
	font-size: 26px;
	color: ${color.primary};
`;
