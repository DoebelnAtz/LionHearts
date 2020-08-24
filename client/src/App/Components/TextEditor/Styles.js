import styled from 'styled-components';
import { units } from '../../../Styles';

export const TextEditorDiv = styled.div`
	width: calc(100%);
	height: calc(100%);
	${props => props.error ? 'border: 2px solid red;' : ''};
	border-radius: ${units.radius};
`;
