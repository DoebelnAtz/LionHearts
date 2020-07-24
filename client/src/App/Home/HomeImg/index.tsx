import React from 'react';

import HomePNG from '../../../assets/images/home_img.png';
import {BGImg, ImgDiv} from "./Styles";

const HomeImg = () => {
    return (
        <BGImg src={HomePNG}>
            <ImgDiv>

            </ImgDiv>
        </BGImg>
    )
};

export default HomeImg;