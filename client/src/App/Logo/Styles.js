import styled from 'styled-components';
import { cursor, units } from '../../Styles';

export const LogoDiv = styled.div`
	${cursor.clickable};

	display: flex;
`;

export const LogoImg = styled.img`
	position: relative;
	height: ${(props) => props.height};
	margin: auto;
	display: block;
	@media (max-width: ${units.tablet}) {
		display: ${(props) => (props.compact ? 'none' : 'block')};
	}
`;

export const LogoHead = styled.img`
	position: relative;
	height: ${(props) => props.height};
	margin: auto;
	display: none;
	width: ${(props) => props.height};
	@media (max-width: ${units.tablet}) {
		display: ${(props) => (props.compact ? 'block' : 'none')};
	}
`;
