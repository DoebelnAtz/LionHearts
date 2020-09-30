import styled from 'styled-components';
import { color, components, cursor, font, units } from '../../../Styles';

export const ThumbnailDiv = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 12;
	background: url(${(props) => props.url});
	background-size: cover;
	box-shadow: inset 0 0 0 10px ${color.primary}98;
	background-position: center;
`;
