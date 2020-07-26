import styled from "styled-components";

import {color, components} from "../../../Styles";

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

export const ApplyForm = styled.form`
    display: flex;
    flex-direction: column;
    & label {
        ${components.labeledInput};
    }
    & button {
        ${components.buttonWhite
    }
`;
