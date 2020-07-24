import React from 'react';
import {SummaryColumnDiv, SummaryColumnText, SummaryColumnTitle} from "./Styles";

const SummaryColumn: React.FC<{title: string, text: string}> = ({title, text}) => {
    return (
        <SummaryColumnDiv>
            <SummaryColumnTitle>
                {title.toUpperCase()}
            </SummaryColumnTitle>
            <SummaryColumnText>
                {text}
            </SummaryColumnText>
        </SummaryColumnDiv>
    )
};

export default SummaryColumn;