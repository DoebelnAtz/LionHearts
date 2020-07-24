import React from 'react';
import {NavBarDiv, NavBarLink, NavBarLinksDiv} from "./Styles";


const NavBar = () => {
    return (
        <NavBarDiv>
            <NavBarLinksDiv>
                <NavBarLink>ABOUT US</NavBarLink>
                <NavBarLink>COMMUNITY</NavBarLink>
                <NavBarLink>EVENTS</NavBarLink>
                <NavBarLink>NEWS</NavBarLink>
                <NavBarLink>APPLY</NavBarLink>

            </NavBarLinksDiv>
        </NavBarDiv>
    )

};

export default NavBar;