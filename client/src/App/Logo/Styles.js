import styled from 'styled-components';
import { cursor } from '../../Styles';

export const LogoDiv = styled.div`
	${cursor.clickable};
	height: 60px;
	width: 220px;
	display: flex;
	overflow-y: hidden;
`;

export const LogoImg = styled.div`
	position: relative;
	top: -16px;
	background-image: url(${(props) => props.src});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	height: 86px;
	margin: auto;
	width: 500px;
`;
