import styled from 'styled-components';
import { color, colorAdjust, cursor, font, units } from '../../../../Styles';

export const ApplicationDiv = styled.div`
	width: 100%;
`;

export const ApplicationTitleRow = styled.div`
	width: calc(100% - ${units.margin} * 2);
	margin: ${units.margin} auto;
	font-size: 18px;
	display: flex;
`;

export const ApplicationResults = styled.div`
	width: calc(100% - ${units.margin} * 2);
	margin: 0 auto;
`;

export const ApplicationCard = styled.div`
	width: calc(100%);
	margin: 5px auto;
	padding: 2% 0;
	display: flex;
	border-bottom: 2px solid ${color.secondary};
	${cursor.clickable};
	&:hover {
		transition: background-color 0.1s;
		background-color: ${colorAdjust.darken('#ffffff', 0.05)};
	}
`;

export const ApplicationInfoLabel = styled.span`
	${font.RBold};
	color: ${color.primary};
`;

export const ApplicationInfoName = styled.div`
	display: flex;
	width: 40%;
	flex-direction: column;
`;

export const ApplicationInfoSubmitted = styled.div`
	display: flex;
	margin: 0 auto;
	width: 40%;

	flex-direction: column;
`;

export const ApplicationInfoStatus = styled.div`
	display: flex;
	margin-left: auto;
	width: 20%;
	flex-direction: column;
	& span {
		text-align: right;
	}
`;

export const ApplicantName = styled.span`
	${font.text};
	font-size: 16px;
	color: ${color.header};
	margin-top: auto;
`;

export const ApplicantStatus = styled.span`
	${font.text};
	color: ${(props) => props.color};
	margin-top: auto;
`;
