import styled from 'styled-components';
import { color, units } from '../../../Styles';

export const AboutUsDiv = styled.div`
	height: 100%;
	width: 100%;
	background-color: ${color.BG0};
`;

export const AboutUsContainer = styled.div`
	margin: max(5%, 20px) max(5%, 20px) max(5%, 20px) min(10vw, 100px);
	& p {
		font-size: 16px;
		letter-spacing: 1px;
		line-height: 1.5rem;
		margin-bottom: 3rem;
	}
`;
