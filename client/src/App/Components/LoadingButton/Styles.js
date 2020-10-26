import styled from 'styled-components';
import { color, components } from '../../../Styles';

export const SaveBtn = styled.button`
	${components.buttonWhite};
	z-index: 2;
	width: ${(props) => (props.width ? props.width : 'fit-content')};
	height: ${(props) => (props.height ? props.height : '38px')};
	line-height: calc(
		${(props) => (props.height ? props.height : '38px')} - 8px
	);
	padding-top: 6px;
	transition: border-color 0.4s;
	border: 2px solid ${color.primary};
	border-color: ${(props) =>
		props.saved ? color.tertiary : props.error ? 'red' : color.primary};
`;
