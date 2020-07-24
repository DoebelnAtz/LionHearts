import React from 'react';
import NavBar from "../NavBar";

import { HomeDiv } from "./Styles";
import HomeImg from "./HomeImg";
import SummarySection from "./SummarySection";
import EventSection from "./EventSection";

const Home: React.FC = () => {
    return (
        <HomeDiv>
           <NavBar/>
           <HomeImg/>
           <SummarySection/>
           <EventSection/>
        </HomeDiv>
    )
};

export default Home;