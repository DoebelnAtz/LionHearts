import styled from 'styled-components';
import { color, components } from '../../../Styles';

export const SaveBtn = styled.button`
	${components.buttonWhite};
	z-index: 2;
	transition: border-color 0.4s;
	border: 3px solid ${color.primary};
	border-color: ${(props) =>
		props.saved ? color.tertiary : props.error ? 'red' : color.primary};
`;
