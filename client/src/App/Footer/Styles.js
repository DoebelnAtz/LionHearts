import styled from 'styled-components';
import { color, font, cursor, units } from '../../Styles';

export const FooterDiv = styled.div`
	background-color: ${color.BG0};
	border-top: 5px solid ${color.tertiary};
	display: flex;
`;

export const FooterContentDiv = styled.div`
	margin: 20px min(10vw, 100px);
	display: flex;
	flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
	height: 100%;
	width: 100%;
`;

export const LinkDiv = styled.div`
	display: flex;
	height: 60px;
	flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
	width: 100%;
	padding: ${units.margin};
`;

export const LogoDiv = styled.div`
	width: fit-content;
	margin: auto 0;
	@media (max-width: 900px) {
		margin: 0 auto 0 0;
	}
`;

export const FooterNavDiv = styled.div`
	flex-wrap: nowrap;
	display: flex;
	margin: ${(props) => (!props.isMobile ? 'auto auto' : 'auto auto auto 0')};
`;

export const FooterNavBarLinksDiv = styled.div`
	margin: ${(props) => (!props.isMobile ? 'auto auto' : 'auto auto auto 0')};
	position: relative;
	display: flex;
	padding-top: 10px;
	flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
	z-index: 3;
`;

export const FooterNavBarLink = styled.span`
	color: ${(props) => (props.inverse ? `${color.primary}` : `${color.BG0}`)};
	${font.DCBold};
	font-size: 20px;
	line-height: 20px;
	z-index: 3;
	padding: ${(props) => (props.isMobile ? '10px 0' : '0 1vw')};
	${cursor.clickable};
	& a {
		color: ${(props) =>
			props.inverse ? `${color.primary}` : `${color.BG0}`};
		text-decoration: none;
	}
`;

export const SoMeLinksDiv = styled.div`
	flex-wrap: nowrap;
	display: flex;
	margin: auto 0;
	& img {
		margin: auto 2vw 0 0;
		height: 26px;
		&:last-child {
			margin: auto 0 0 0;
		}
	}
	@media (max-width: 900px) {
		margin-bottom: ${units.margin};
	}
`;
