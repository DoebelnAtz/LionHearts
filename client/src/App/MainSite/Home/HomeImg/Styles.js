import styled from 'styled-components';
import { color, font } from '../../../../Styles';

export const ImgDiv = styled.div`
	height: 100%;
	width: 100%;
`;

export const BGImg = styled.div`
	max-height: 570px;
	height: 100%;
	width: 100%;
	background-image: url(${(props) => props.src});
	background-color: ${color.primary};
	background-blend-mode: multiply;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;

export const Vision = styled.h1`
	${font.DCBold};
	font-size: min(86px, max(12vw, 34px));
	position: relative;
	left: min(10vw, 100px);
	bottom: -250px;
	z-index: 1;
	margin: 0;
	width: calc(100% - 100px);
	max-width: min(400px, 60vw);
	color: white;
	@media (max-width: 900px) {
		bottom: calc(-400px + 10vw);
	}
`;
