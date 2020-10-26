import styled from 'styled-components';
import { units } from '../../../Styles';

export const TextEditorDiv = styled.div`
	width: calc(100%);
	height: calc(100% - ${units.margin} * 3);
	min-height: 30px;
	${(props) => (props.error ? 'border: 2px solid red;' : '')};
	border-radius: ${units.radius};
`;
