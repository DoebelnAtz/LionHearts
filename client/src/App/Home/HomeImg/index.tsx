import React from 'react';

import HomePNG from '../../../assets/images/home_img.png';
import {BGImg, ImgDiv} from "./Styles";

const HomeImg = () => {
    return (
        <ImgDiv>
           <BGImg src={HomePNG}/>
        </ImgDiv>
    )
};

export default HomeImg;