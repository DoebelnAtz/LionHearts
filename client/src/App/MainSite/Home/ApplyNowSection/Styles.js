import styled from 'styled-components';

import { color, components, font } from '../../../../Styles';

export const ApplyNowSectionDiv = styled.div`
	width: 100%;
	max-height: 500px;
	height: 100%;
	background-color: ${color.primary};
	display: flex;
`;

export const CallToActionDiv = styled.div`
	display: flex;
	margin: 0 auto;
	max-width: 600px;
	text-align: center;
	flex-direction: column;
`;

export const CallToAction = styled.h2`
	${font.VItalic};
	letter-spacing: 4px;
	color: #ffffff;
	text-decoration: underline;
	text-decoration-color: ${color.secondary};
	font-size: min(51px, 10vw);
	line-height: 52px;
	margin: auto 0 60px 0;
`;

export const ApplyButton = styled.button`
	${components.buttonBlue};
	height: 46px;
	width: 220px;
	line-height: 44px;
	margin: 0 auto auto auto;
`;
