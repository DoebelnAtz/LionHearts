import styled from 'styled-components';
import { color, units, font } from '../../../../Styles';

export const TextEditOutput = styled.textarea`
	width: calc(100% - ${units.margin} * 2);
	height: min(200px, 10vh);
	border: none;
	font-size: 12px;
	letter-spacing: 0;
	border-radius: ${units.radius};
	background-color: ${color.BG1};
	padding: 0;
	${font.RReg};
	resize: vertical;
	:focus {
		outline: none;
	}
`;

export const TextOutput = styled.div`
	${font.RReg};
	width: calc(100% - ${units.margin} * 2);
	height: fit-content;
	border-radius: ${units.radius};
	& a {
		text-decoration: none;
		color: ${color.secondary};
		&:hover {
			color: ${color.secondaryShade};
		}
	}
`;
