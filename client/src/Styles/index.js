import styled, { css } from 'styled-components';
import Color from 'color';

const baseColor = '#ffffff';

export const colorAdjust = {
	darken: (color, amount) =>
		Color(color).darken(amount).hex(),
	lighten: (color, amount) =>
		Color(color).lighten(amount).string(),
	rgba: (color, opacity) =>
		Color(color).alpha(opacity).string(),
};

export const color = {
	primary: '#0064FF',
	primaryShade: colorAdjust.darken('#0064FF', 0.1),
	secondary: '#FF684F',
	secondaryShade: colorAdjust.darken('#FF684F', 0.1),
	tertiary: '#FFE8D8',
	tertiaryShade: colorAdjust.darken('#FFE8D8', 0.1),
	text: '#232323',
	header: '#0E274D',
	BG0: baseColor,
	BG1: colorAdjust.darken(baseColor, 0.05),
	BG2: colorAdjust.darken(baseColor, 0.1),
	BG3: colorAdjust.darken(baseColor, 0.15),
	BG4: colorAdjust.darken(baseColor, 0.2),
	BG5: colorAdjust.darken(baseColor, 0.25),
};

export const units = {
	margin: '10px',
	radius: '4px',
	tablet: '1000px',
	mobile: '600px',
};

export const font = {
	DCBold: css`
		font-family: din-condensed-bold, sans-serif;
	`,
	VItalic: css`
		font-family: volkhov-italic, serif;
		font-style: italic;
	`,
	RCBold: css`
		font-family: roboto-condensed-bold, sans-serif;
	`,
	RCReg: css`
		font-family: roboto-condensed-regular, sans-serif;
	`,
	RCLight: css`
		font-family: roboto-condensed-light, sans-serif;
	`,
	RReg: css`
		font-family: roboto-regular, sans-serif;
	`,
	RBold: css`
		font-family: roboto-bold, sans-serif;
	`,
	BBold: css`
		font-family: 'Libre Baskerville', serif;
	`,
	title: css`
		font-size: 36px;
		letter-spacing: 2px;
	`,
	text: css`
		font-size: 20px;
		font-family: roboto-regular, sans-serif;
		letter-spacing: 0.5px;
		color: ${color.primary};
	`,
	error: css`
		font-size: 18px;
		font-family: din-condensed-bold, sans-serif;
		color: red !important;
	`,
	link: css`
		text-decoration: none;
		&:hover {
			color: ${colorAdjust.darken(
				color.tertiary,
				0.2,
			)};
		}
	`,
};

export const layout = {
	row: css`
		display: flex;
		flex-wrap: wrap;
	`,
	col: css`
		flex-basis: 0;
		flex-grow: 1;
		max-width: 100%;
	`,
	centered: css`
		margin-left: auto;
		margin-right: auto;
	`,
};

export const border = {
	setBorders: (top, right, bot, left, color) =>
		css`
			border-color: ${color};
			border-style: solid;
			border-width: ${top}px ${right}px ${bot}px
				${left}px;
		`,
};

export const modal = {
	inside: css`
		position: absolute;
		left: 20%;
		right: 20%;
		top: 15%;
		max-height: 80vh;
		padding: ${units.margin};
		border: 5px solid ${color.BG2};
		border-radius: 2px;
		margin: auto;
		background: ${color.BG2};
		overflow: auto;
		z-index: 10;
		${layout.col};
	`,
	outside: css`
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 11;
	`,
};

export const cursor = {
	clickable: css`
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		cursor: pointer;
	`,
	draggable: css`
		cursor: grab;
		user-select: none;
	`,
	dragging: css`
		cursor: grabbing;
	`,
	notAllowed: css`
		cursor: not-allowed;
		user-select: none;
	`,
};

export const components = {
	input: css`
		${font.RCReg};
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-color: ${color.tertiary};
		border: none;
		caret-color: ${color.primary};
		caret-shape: block;
		color: ${color.primary};
		padding: 2px 6px;
		font-size: 16px;
		border-radius: 0;
		box-shadow: none;
		&:focus {
			outline: none;
		}
	`,
	animatedLabeledInput: css`
		position: relative;
		overflow: hidden;
		height: 66px;
		& input {
			width: 100%;
			height: 100%;
			color: ${color.text};
			padding-top: 20px;
			border: none;
			outline: none;
			&:focus + label::after {
				transform: translateX(0%);
			}
			&:valid + label::after {
				transform: translateX(0%);
			}
			&:focus + label span {
				transform: translateY(-100%);
			}
			&:valid + label span {
				transform: translateY(-100%);
			}
			&:-webkit-autofill,
			:-webkit-autofill:focus {
				background-color: ${color.BG0};
				-webkit-box-shadow: 0 0 0 1000px
					${color.BG0} inset !important;
			}

			&:-webkit-autofill + label span {
				transform: translateY(-100%);
			}
		}

		& label {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
			border-bottom: 2px solid ${color.tertiaryShade};
		}

		& label::after {
			content: '';
			position: absolute;
			height: 100%;
			width: 100%;
			left: 0;
			bottom: -2px;
			transition: all 0.3s ease;
			border-bottom: 2px solid ${color.secondary};
			transform: translateX(-100%);
		}
		& label span {
			position: absolute;
			bottom: 5px;
			${font.DCBold};
			color: ${color.header};
			font-size: 18px;
			transition: all 0.3s ease;
		}
	`,
	labeledInput: css`
		${font.DCBold};
		font-size: 20px;
		color: ${color.primary};
		display: flex;
		flex-direction: column;
		margin: 10px 0;
		& input {
			font-size: 16px;
			border-radius: 0;
			${font.RCReg};
			box-shadow: none;
			background-color: ${color.tertiary};
			border: none;
			caret-color: ${color.primary};
			caret-shape: block;
			color: ${color.primary};
			padding: 2px 6px;
		}
		& input:focus {
			outline: none;
		}
		& textarea {
			background-color: ${color.tertiary};
			border: none;
			font-size: 16px;
			border-radius: 0;
			box-shadow: none;
			padding: 6px;
			resize: vertical;
		}
		& textarea:focus {
			outline: none;
		}
	`,
	buttonWhite: css`
		padding: 2px 12px;
		letter-spacing: 1px;
		${font.DCBold};
		height: 30px;
		text-transform: uppercase;
		font-size: 20px;
		line-height: 30px;
		flex-shrink: 0;
		background-color: ${color.BG0};
		${cursor.clickable};
		border: 2px solid ${color.primary};
		transition: background-color 0.1s;
		color: ${color.primary};
		&:focus {
			outline: none;
		}
		&:hover,
		:active {
			background-color: ${colorAdjust.darken(
				color.BG0,
				0.1,
			)};
		}
		&:disabled {
			color: ${color.primary}90;
			border-color: ${color.primary}90;
			${cursor.notAllowed};
		}
		&:disabled:hover {
			color: ${color.primary}90;
			border-color: ${color.primary}90;
			${cursor.notAllowed};
			background-color: white;
		}
	`,
	buttonBlue: css`
		padding: 2px 12px;
		letter-spacing: 1px;
		${font.DCBold};
		text-transform: uppercase;
		height: 32px;
		font-size: 20px;
		line-height: 30px;
		background-color: ${color.primary};
		${cursor.clickable};
		border: 2px solid ${color.BG0};
		transition: background-color 0.1s;
		color: ${color.BG0};
		&:focus {
			outline: none;
		}
		&:hover {
			background-color: ${colorAdjust.darken(
				color.primary,
				0.1,
			)};
		}
		&:disabled {
			color: ${color.primary}90;
			border-color: ${color.primary}90;
			${cursor.notAllowed};
		}
		&:disabled:hover {
			color: ${color.primary}90;
			border-color: ${color.primary}90;
			${cursor.notAllowed};
			background-color: white;
		}
	`,
};

export const UnorderedList = styled.ul`
    
`;

export const ListItem = styled.li`
    ${font.RReg};
    font-size: 18px;
    line-height: 1.5em;
    @media (max-width: ${units.mobile}) {
    	font-size: calc(8px + 2vw);
    }
`;

export const Paragraph = styled.p`
    ${font.RReg};
    line-height: 1.5em;
    max-width: 700px;
    margin: 1.5em 0!important;
    font-size: 18px!important;
    @media (max-width: ${units.mobile}) {
    	font-size: calc(8px + 2vw)!important;
    }
`;

export const Header2 = styled.h2`
    ${font.DCBold};
    color: ${color.primary};
    font-size: 34px;
    @media (max-width: ${units.mobile}) {
    	font-size: calc(22px + 2vw);
    }
`;

export const Header3 = styled.h3`
    ${font.DCBold};
    margin-top: 2.5em;
    font-size: 24px;
    color: ${color.primaryShade};
    @media (max-width: ${units.mobile}) {
    	font-size: calc(12px + 2vw);
    }
`;

export const AnimatedLabeledInputDiv = styled.div`
	${components.animatedLabeledInput};
`;

export const RowDiv = styled.div`
	${layout.row};
	margin: ${(props) =>
		props.margin ? props.margin : '0'};
`;
