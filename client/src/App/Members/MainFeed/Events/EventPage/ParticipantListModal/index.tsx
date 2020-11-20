import React, {
	Dispatch,
	SetStateAction,
	useRef,
} from 'react';
import Modal from '../../../../../Components/Modal';
import {
	ParticipantActionContainer,
	ParticipantCard,
	ParticipantInfoContainer,
	ParticipantListContainer,
	ParticipantListHeader,
	ParticipantListHeaderContainer,
	ParticipantName,
	ParticipantProfilePic,
	ParticipantProfilePicContainer,
} from './Styles';
import {
	useDismiss,
	useGet,
} from '../../../../../../Hooks';
import {
	EventParticipant,
	MemberEvent,
	Profile,
} from '../../../../../../@types';
import ProfilePic from '../../../../../Components/ProfilePic';
import { capitalizeFirst } from '../../../../../../Utils';

type ShowParticipantListModalProps = {
	setShowParticipants: Dispatch<SetStateAction<boolean>>;
	event: MemberEvent;
	setEvent: Dispatch<
		SetStateAction<MemberEvent | undefined>
	>;
};

const ParticipantListModal: React.FC<ShowParticipantListModalProps> = ({
	setShowParticipants,
	event,
	setEvent,
}) => {
	const inside = useRef<HTMLDivElement>(null);
	const close = () => {
		setShowParticipants(false);
	};
	useDismiss(inside, close);

	const [participants, setParticipants] = useGet<
		EventParticipant[]
	>(`/events/participants/${event.e_id}`);

	const renderGoingParticipants = () => {
		return (
			participants &&
			participants.map((participant) => {
				if (participant.status === 'going') {
					return (
						<ParticipantCard
							key={participant.u_id}
						>
							<ParticipantProfilePicContainer>
								<ParticipantProfilePic>
									<ProfilePic
										src={
											participant.profile_pic
										}
									/>
								</ParticipantProfilePic>
							</ParticipantProfilePicContainer>
							<ParticipantInfoContainer>
								<ParticipantName>{`${capitalizeFirst(
									participant.firstname,
								)} ${capitalizeFirst(
									participant.lastname,
								)}`}</ParticipantName>
							</ParticipantInfoContainer>
							<ParticipantActionContainer></ParticipantActionContainer>
						</ParticipantCard>
					);
				}
			})
		);
	};

	const renderMaybeParticipants = () => {
		return (
			participants &&
			participants.map((participant) => {
				if (participant.status === 'maybe') {
					return (
						<ParticipantCard
							key={participant.u_id}
						>
							<ParticipantProfilePicContainer>
								<ParticipantProfilePic>
									<ProfilePic
										src={
											participant.profile_pic
										}
									/>
								</ParticipantProfilePic>
							</ParticipantProfilePicContainer>
							<ParticipantInfoContainer>
								<ParticipantName>{`${capitalizeFirst(
									participant.firstname,
								)} ${capitalizeFirst(
									participant.lastname,
								)}`}</ParticipantName>
							</ParticipantInfoContainer>
							<ParticipantActionContainer></ParticipantActionContainer>
						</ParticipantCard>
					);
				}
			})
		);
	};

	const renderNotGoingParticipants = () => {
		return (
			participants &&
			participants.map((participant) => {
				if (participant.status === 'not going') {
					return (
						<ParticipantCard
							key={participant.u_id}
						>
							<ParticipantProfilePicContainer>
								<ParticipantProfilePic>
									<ProfilePic
										src={
											participant.profile_pic
										}
									/>
								</ParticipantProfilePic>
							</ParticipantProfilePicContainer>
							<ParticipantInfoContainer>
								<ParticipantName>{`${capitalizeFirst(
									participant.firstname,
								)} ${capitalizeFirst(
									participant.lastname,
								)}`}</ParticipantName>
							</ParticipantInfoContainer>
							<ParticipantActionContainer></ParticipantActionContainer>
						</ParticipantCard>
					);
				}
			})
		);
	};

	const renderUnansweredParticipants = () => {
		return (
			participants &&
			participants.map((participant) => {
				if (participant.status === null) {
					return (
						<ParticipantCard
							key={participant.u_id}
						>
							<ParticipantProfilePicContainer>
								<ParticipantProfilePic>
									<ProfilePic
										src={
											participant.profile_pic
										}
									/>
								</ParticipantProfilePic>
							</ParticipantProfilePicContainer>
							<ParticipantInfoContainer>
								<ParticipantName>{`${capitalizeFirst(
									participant.firstname,
								)} ${capitalizeFirst(
									participant.lastname,
								)}`}</ParticipantName>
							</ParticipantInfoContainer>
							<ParticipantActionContainer></ParticipantActionContainer>
						</ParticipantCard>
					);
				}
			})
		);
	};

	return (
		<Modal inside={inside} close={close}>
			<ParticipantListContainer ref={inside}>
				<ParticipantListHeaderContainer>
					<ParticipantListHeader>
						Going
					</ParticipantListHeader>
				</ParticipantListHeaderContainer>
				{renderGoingParticipants()}
				<ParticipantListHeaderContainer>
					<ParticipantListHeader>
						Maybe
					</ParticipantListHeader>
				</ParticipantListHeaderContainer>
				{renderMaybeParticipants()}

				<ParticipantListHeaderContainer>
					<ParticipantListHeader>
						Not Going
					</ParticipantListHeader>
				</ParticipantListHeaderContainer>
				{renderNotGoingParticipants()}
				<ParticipantListHeaderContainer>
					<ParticipantListHeader>
						No response
					</ParticipantListHeader>
				</ParticipantListHeaderContainer>
				{renderUnansweredParticipants()}
			</ParticipantListContainer>
		</Modal>
	);
};

export default ParticipantListModal;
