import styled from "styled-components";

export const SignupDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

export const SignupForm = styled.div`
    margin: auto;
    width: 20%;
    height: 50%;
    
    & form {
      display: flex;
      flex-direction: column;
      & input {
            margin: 20px 0;
            padding: 5px;
      }
    }
`;