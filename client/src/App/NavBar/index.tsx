import React from 'react';
import {NavBarDiv, NavBarLink, NavBarLinksDiv, NavBarLogoDiv} from "./Styles";
import Logo from "../Logo";


const NavBar = () => {
    return (
        <NavBarDiv>
            <NavBarLogoDiv>
                <Logo/>
            </NavBarLogoDiv>
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