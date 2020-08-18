import styled from "styled-components";
import { animated } from "react-spring";
import {color, components, font, units} from "../../../../Styles";

export const CreateEventDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    ${font.DCBold};
`;

export const EventCreationDiv = styled(animated.div)`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
`;

export const SelectedDateDiv = styled.div`
    width: 100%;
    display: flex;
`;

export const SelectedDateLabel = styled.span`
    margin-right: auto;
    ${font.RReg};
`;

export const SelectedDateInfo = styled.span`
    ${font.DCBold};
    color: ${color.primary};
`;

export const SelectedTimeDiv = styled.div`
    width: 100%;
    display: flex;
    
`;



export const SelectedTimeLabel = styled.span`
    margin-right: auto;
     ${font.RReg};
`;

export const SelectedTimeInfo = styled.div`
    
`;

export const SelectTimeInput = styled.input`
    ${components.input};
    width: 16px;
    height: 14px;
`;

export const SelectedTitleDiv = styled.div`
    width: 100%;
    display: flex;
`;

export const SelectedTitleLabel = styled.span`
    margin-right: auto;
     ${font.RReg};
`;

export const SelectedTitleInfo = styled.input`
    ${components.input};
    height: 14px;
`;

export const EventCreationForm = styled.div`
    width: calc(100% - ${units.margin} * 2);
    margin: 0 auto;
    background-color: ${color.BG1};
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: hidden;
    &>div {
        margin: 10px 0;

    }
`;

export const DateResult = styled.div`
    margin-top: auto!important;
    width: 100%;
`;

export const SubmitButton = styled.button`
    ${components.buttonWhite};
    width: 100%;
    margin: 5px auto;
`;

export const CreateEventButton = styled.button`
    ${components.buttonWhite};
    width: calc(100% - ${units.margin} * 2);
    margin: auto;

`;