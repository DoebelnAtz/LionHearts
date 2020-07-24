import React from 'react';
import NavBar from "../NavBar";

import { HomeDiv } from "./Styles";
import HomeImg from "./HomeImg";
import SummarySection from "./SummarySection";

const Home: React.FC = () => {
    return (
        <HomeDiv>
           <NavBar/>
           <HomeImg/>
           <SummarySection/>
        </HomeDiv>
    )
};

export default Home;