import styled from 'styled-components';
import { color, units , font} from '../../../Styles';

export const AboutUsDiv = styled.div`
	height: 100%;
	width: 100%;

`;

export const ParagraphHeader = styled.h2`
    ${font.DCBold};
    color: ${color.secondary};
    font-size: 32px;
`;

export const AboutUsParagraph = styled.p`
    ${font.RReg};
    line-height: 1.5em;
    font-size: 18px;
`;

export const AboutUsVideoSection = styled.div`
    width: 100vw;
    position: relative;
     left: max(-10vw, -100px);
    background-color: ${color.tertiary};
    display: flex;
`;

export const AboutUsVideo = styled.video`
    width: 80%;
    margin: 5% auto;
     &:focus {
    outline: none;
    border: none;
    }
`;

export const SectionContainer = styled.div`
    margin: 5% 0;
`;

export const AboutUsContainer = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: column;
	margin: max(5%, 20px) max(5%, 20px) max(5%, 20px) min(10vw, 100px);
	
	& div:nth-child(even) {
	    margin-left: auto;
	    & h2 {
	        color: ${color.secondaryShade};
	    }
	}
`;
