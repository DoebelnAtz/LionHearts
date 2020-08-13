import React, { useState } from 'react';
import { MemberEvent } from '../../../../Types';
import { EventCardResponseRow, EventCardTitle, EventCardDiv } from './Styles';
import DropDownComponent from '../../../Components/DropDown';
import { makeRequest } from '../../../../Api';

type EventCardProps = {
	card: MemberEvent;
};

const EventCard: React.FC<EventCardProps> = ({ card }) => {
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
			console.log(e);
		}
	};

	return (
		<EventCardDiv key={eventCard.e_id}>
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
		</EventCardDiv>
	);
};

export default EventCard;
