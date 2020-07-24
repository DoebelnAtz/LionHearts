import React from 'react';
import {SummaryColumns, SummarySectionDiv} from "./Styles";
import SummaryColumn from "./SummaryColumn";

const SummarySection: React.FC = () => {
    return (
        <SummarySectionDiv>
            <SummaryColumns>

            <SummaryColumn title={'COMMUNITY'} text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, ratione.'}/>
            <SummaryColumn title={'NETWORKING'} text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, ratione.'}/>
            <SummaryColumn title={'LIONTALKS'} text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, ratione.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, ratione.'}/>
            </SummaryColumns>

        </SummarySectionDiv>
    )
};

export default SummarySection;