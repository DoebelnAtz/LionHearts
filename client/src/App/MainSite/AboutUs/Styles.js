import styled from 'styled-components';
import { color, units , font} from '../../../Styles';

export const AboutUsDiv = styled.div`
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

export const VideoPlayerControlsRow = styled.div`
    display: flex;
    margin-bottom: 3%;
    justify-content: center;
    width: 100%;
`;

export const AboutUsVideoSection = styled.div`
    width: 100vw;
    position: relative;
     left: max(-10vw, -100px);
    background-color: ${color.tertiary};
    display: flex;
    flex-direction: column;
`;

export const AboutUsVideo = styled.video`
    width: 80%;
    max-width: 800px;
    margin: 5% auto ${units.margin} auto;
     &:focus {
    outline: none;
    border: none;
    }
`;

export const SectionContainer = styled.div`
    margin: 2% 0;
`;

export const AboutUsContainer = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: column;
	margin: max(2%, 20px) max(2%, 20px) max(2%, 20px) min(10vw, 100px);
	
	& div:nth-child(even) {
	    //margin-left: auto;
	    & h2 {
	        color: ${color.secondaryShade};
	    }
	}
`;
