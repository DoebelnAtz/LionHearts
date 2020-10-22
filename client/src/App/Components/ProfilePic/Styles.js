import styled from "styled-components";

export const ProfilePicture = styled.div`
    background-image: url("${props => props.src}"), url(${props => props.fallback});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    border-radius: 50%;
    width: 100%;
`;