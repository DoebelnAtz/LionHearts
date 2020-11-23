import styled from 'styled-components';
import { color, components } from '../../../Styles';

export const MemberLoginDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	background: url(${props => props.src});
	background-size: cover;
	background-repeat: no-repeat ;
`;

export const MemberLoginContainer = styled.div`
	margin: auto;
	background-color: ${color.BG0};
`;

export const MemberLoginFormContainer = styled.div`
    	border-radius: 10px;
    	overflow: hidden;
    	border: 4px solid ${color.BG0};

`;

export const BackToFrontPage = styled.button`
	${components.buttonWhite};
	height: 38px;
	width: 75px;
	padding: 6px 12px 2px 12px;
`;
