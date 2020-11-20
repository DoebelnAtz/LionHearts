import styled from 'styled-components'
import {color, components, font, units} from "../../../../../../Styles";

export const AddParagraphContainer = styled.div`
    width: calc(100% - ${units.margin} * 2);
    display: flex;
    padding: ${units.margin};
    flex-direction: column;
    background-color: ${color.BG1};
    margin-bottom: ${units.margin};
    border-radius: 5px;
`;

export const AddParagraphEditor = styled.div`
    width: 100%;
    height: 200px;
    margin-bottom: ${units.margin};
`;

export const AddParagraphPreview = styled.div`
    width: calc(100% - 24px);
    border: 2px solid ${color.primary};
    padding: ${units.margin};
    margin-bottom: ${units.margin};
    height: calc(200px - 4px - ${units.margin} * 2);
`;

export const AddParagraphImageSizeOption = styled.input`
    ${components.input};
    width: 60px;
    height: 24px;
    border: 1px solid ${color.primary};
`;

export const AddParagraphImage = styled.div`
    margin: 0 auto ${units.margin} auto;
    width: calc(30px + 8vw);
    height: calc(30px + 8vw);
    max-height: 100px;
    max-width: 100px;
`;

export const ShowImageSelectorButton = styled.div`
    ${components.buttonWhite};
    background-color: ${color.tertiary};
    height: 30px;
    border-width: 1px;
    ${font.RCReg};
    font-size: 16px;
    line-height: 30px;
    padding: 0 10px;
    letter-spacing: 0;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: ${color.tertiaryShade};
    }
`;

export const AddParagraphImageOptions = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: ${units.margin};
`;


export const ParagraphOptionRow = styled.div`
    width: 100%;
`;

export const ParagraphOption = styled.div`
    margin-right: ${units.margin};
    ${font.DCBold};
    display: flex;
    flex-direction: column;
    color: ${color.primary};
    font-size: 18px;
    margin-right: auto;
    &:last-child {
        margin-right: 0;
    }
`;

export const AddParagraphImageInput = styled.input`
    ${components.input};
    margin-right: auto;
    
`;
