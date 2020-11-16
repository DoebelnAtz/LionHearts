import styled from 'styled-components';
import { font, color } from '../../../../Styles';

export const SuccessPageContainer = styled.div`
	width: 80%;
	margin: 130px min(10vw, 100px);
	background-color: ${color.BG0};
	display: flex;
		flex-direction: column;
	
`;

export const SuccessHeader = styled.h1`
	${font.VItalic};
	margin-top: 0;
	text-transform: uppercase;
	text-decoration: underline;
	text-decoration-color: ${color.tertiary};
	color: ${color.primary};
	font-size: 36px;
	@media (max-width: 900px) {
		font-size: calc(16px + 2vw);
	}
`;

export const SuccessInfo = styled.p`
	${font.VItalic};
	font-size: 24px;
	color: ${color.text};
`;
