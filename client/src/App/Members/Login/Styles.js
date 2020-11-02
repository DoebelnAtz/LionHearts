import styled from 'styled-components';
import { color, components } from '../../../Styles';

export const MemberLoginDiv = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${color.BG0};
	display: flex;
`;

export const MemberLoginContainer = styled.div`
	margin: auto;
	border: 4px solid ${color.primary};
`;

export const BackToFrontPage = styled.button`
	${components.buttonWhite};
	height: 38px;
	width: 75px;
	padding: 6px 12px 2px 12px;
`;
