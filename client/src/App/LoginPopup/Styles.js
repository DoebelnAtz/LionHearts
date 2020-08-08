import styled from "styled-components";
import {animated} from "react-spring";
import {components, layout, font, color} from "../../Styles";

export const LoginDiv = styled(animated.div)`
    max-width: 400px;
    width: 50vw;
    display: flex;
    padding: 10px;
    overflow: hidden;
    flex-direction: column;
`;

export const UsernameDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
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

export const PasswordDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
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

export const ButtonDiv = styled.div`
    width: 100%;
    ${layout.row};
`;

export const LoginButton = styled.button`
    ${components.buttonWhite};
    margin: 0 auto;
`;
