import React, { useState } from 'react';
import { MemberEvent } from '../../../../Types';
import {
	EventCardResponseRow,
	EventCardTitle,
	EventCardDiv,
	EventCardTimeUntilDiv,
	EventCardTimeUntilSpan,
} from './Styles';
import DropDownComponent from '../../../Components/DropDown';
import { makeRequest } from '../../../../Api';
import { calculateTimeSince } from '../../../../Utils';
import { EventTitleSpan } from '../Styles';

type EventCardProps = {
	card: MemberEvent;
	highlighted?: boolean;
};

const EventCard: React.FC<EventCardProps> = ({ card, highlighted = false }) => {
	const [eventCard, setEventCard] = useState<MemberEvent>(card);

	const handleEventStatusChange = async (newStatus: string) => {
		let oldValue = eventCard.status;
		try {
			setEventCard({ ...eventCard, status: newStatus });
			await makeRequest('/events/change_participation', 'POST', {
				eventId: eventCard.e_id,
				status: newStatus,
			});
		} catch (e) {
			setEventCard({ ...eventCard, status: oldValue });
		}
	};

	return (
		<EventCardDiv highlighted={highlighted} key={eventCard.e_id}>
			<EventCardTitle>{eventCard.title}</EventCardTitle>
			<EventCardResponseRow>
				Respond:
				<DropDownComponent
					state={eventCard.status || 'respond'}
					setSelect={handleEventStatusChange}
					optionList={['going', 'maybe', 'not going']}
					width={'100px'}
					height={'20px'}
				/>
			</EventCardResponseRow>
			<EventCardTimeUntilDiv>
				<EventCardTimeUntilSpan>
					{calculateTimeSince(eventCard.time)}
				</EventCardTimeUntilSpan>
			</EventCardTimeUntilDiv>
		</EventCardDiv>
	);
};

export default EventCard;
