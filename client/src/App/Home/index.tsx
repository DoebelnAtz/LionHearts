import React from 'react';
import NavBar from "../NavBar";

import { HomeDiv } from "./Styles";
import HomeImg from "./HomeImg";

const Home: React.FC = () => {
    return (
        <HomeDiv>
           <NavBar/>
           <HomeImg/>
        </HomeDiv>
    )
};

export default Home;