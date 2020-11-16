import styled from 'styled-components';
import { color, units, font } from '../../../Styles';

export const CommunityDiv = styled.div`
	height: 100%;
	width: 100%;
	background-color: ${color.BG0};
`;

export const CommunityContainer = styled.div`
	margin: max(5%, 20px) max(5%, 20px) max(5%, 20px) min(10vw, 100px);
	& p {
		font-size: 16px;
		letter-spacing: 1px;
		line-height: 1.5rem;
		margin-bottom: 3rem;
	}
`;

export const ParagraphHeader = styled.h2`
    ${font.DCBold};
    color: ${color.secondary};
    font-size: 32px;
`;

export const ParagraphSubHeader = styled.h3`
    ${font.DCBold};
    color: ${color.secondary};
`;


export const LanguageList = styled.div`
	display: flex;
	width: 100%;
`;

export const SummaryTitle = styled.span`
	font-size: 20px;
	${font.RBold};
	${color.text};
	margin: ${units.margin} 0;
`;

export const SchoolItem = styled.li`
	font-size: 18px;
	${font.RReg};
	line-height: 1em !important;
	margin-bottom: 1rem !important;
	text-transform: capitalize;
`;



export const LanguageIcon = styled.div`
	height: 50px;
	width: 50px;

	margin:0 20px 0 0;
	background: url(${(props) => props.url});
	background-position: center;
	background-size: cover;
	background-color: ${color.BG3};
	border-radius: 50%;
	background-repeat: no-repeat;
	@media (max-width: ${units.mobile}) {
		height: 40px;
		width: 40px;
	}
`;
