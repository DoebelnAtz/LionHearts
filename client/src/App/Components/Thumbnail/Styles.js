import styled from 'styled-components';
import {
	color,
	components,
	cursor,
	font,
	units,
} from '../../../Styles';

export const ThumbnailDiv = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	background: url(${(props) => props.url});
	background-size: cover;
	//filter: grayscale(100%);
	background-position: center;
	${cursor.clickable};
	background-blend-mode: multiply;
	background-color: ${color.primary}90;
	transition: background-color 0.2s ease-in-out;
	&:hover {
		background-color: ${color.primary};
	}
`;
