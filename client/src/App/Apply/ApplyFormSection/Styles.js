import styled from "styled-components";

import {color, components, cursor, font} from "../../../Styles";

export const ApplyFormSectionDiv = styled.div`
    width: 100%;
    background-color: white;
    display: flex;
    padding: 5% 0;
    border-top: 10px solid ${color.secondary};
`;

export const FormDiv = styled.div`
    max-width: 1600px;
    width: 80%;
    margin: auto auto;
    display: flex;
    flex-direction: column;
`;

export const FormError = styled.p`
    ${font.error};
`;

export const RemoveFileSpan = styled.span`
    font-size: 18px;
    ${cursor.clickable};
    & :hover {
        text-decoration: underline !important;
        text-decoration-color: ${color.primary};
    }
`;

export const UploadedFilesDiv = styled.div`
    display: flex;
    ${font.text};
    margin-bottom: 5px;
`;

export const ApplyForm = styled.form`
    display: flex;
    flex-direction: column;
    & label {
        ${components.labeledInput};
    }
    & button {
        ${components.buttonWhite};
        margin-bottom: 10px;
    }
    & p {
        ${font.text};
        margin: 5px 0;
    }
`;
