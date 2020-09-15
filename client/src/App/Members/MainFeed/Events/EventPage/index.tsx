import React from 'react';
import { useParams } from 'react-router-dom';
import {
	EventPageCommentSection,
	EventPageCreator,
	EventPageDiv,
	EventPageInfoDate,
	EventPageInfoDiv,
	EventPageInfoTitle,
} from './Styles';
import { useGet } from '../../../../../Hooks';
import { MemberEvent } from '../../../../../Types';
import { capitalizeFirst, getLocalTimeFormat } from '../../../../../Utils';

const EventPage: React.FC = () => {
	const params = useParams<{ eid: string }>();

	const [event, setEvent] = useGet<MemberEvent>(`/events/${params.eid}`);

	console.log(event);
	return (
		<EventPageDiv>
			{event && (
				<EventPageInfoDiv>
					<EventPageInfoTitle>{event.title}</EventPageInfoTitle>

					<EventPageInfoDate>
						{getLocalTimeFormat(event.time)}
					</EventPageInfoDate>
					<EventPageCreator>
						Created by: {capitalizeFirst(event?.firstname)}{' '}
						{capitalizeFirst(event?.lastname)}
					</EventPageCreator>
				</EventPageInfoDiv>
			)}
			<EventPageCommentSection></EventPageCommentSection>
		</EventPageDiv>
	);
};

export default EventPage;
