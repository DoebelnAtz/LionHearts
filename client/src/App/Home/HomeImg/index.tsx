import React from 'react';

import HomePNG from '../../../assets/images/home_img.png';
import {BGImg, ImgDiv, Vision} from "./Styles";

const HomeImg = () => {
    return (
        <BGImg src={HomePNG}>
            <ImgDiv>
                <Vision>Tomorrow, built by you</Vision>
            </ImgDiv>
        </BGImg>
    )
};

export default HomeImg;