import styled from 'styled-components';
import { color, font } from '../../../../Styles';
import { animated } from 'react-spring';

export const ImgDiv = styled.div`
	height: 100%;
	display: flex;
	width: 100%;
`;

export const BHContainer = styled(animated.div)`
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: ${color.primary};
`;

export const HomeBlurHash = styled.div`
	max-height: 570px;
	height: 100%;
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
	z-index: 5;
`;

export const BHNavBarContainer = styled.div`
	position: absolute;
	width: 100%;
`;

export const BGImg = styled.div`
	max-height: 570px;
	height: 100%;
	width: 100%;
	position: absolute;
	opacity: ${props => props.completed ? 1 : 0};
	z-index: 4;
	transition: all 2s ease-in-out;
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
	margin: auto 0 60px min(10vw, 100px);
	z-index: 5;
	padding: 0;
	width: calc(100% - 100px);
	opacity: 1;
	max-width: min(400px, 60vw);
	color: white;
	@media (max-width: 900px) {
		margin: auto 0 max(calc(12vw - 60px), 60px) min(10vw, 100px);
	}
`;
