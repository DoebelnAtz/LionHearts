import React from 'react';
import {EventListDiv, EventSectionDiv, EventsHeader} from "./Styles";

const EventSection: React.FC = () => {
    return (
        <EventSectionDiv>
            <EventListDiv>
                <EventsHeader>
                    OUR EVENTS
                </EventsHeader>
            </EventListDiv>

        </EventSectionDiv>
    )
};

export default EventSection;